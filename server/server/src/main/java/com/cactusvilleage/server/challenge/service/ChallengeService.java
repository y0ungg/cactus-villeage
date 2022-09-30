package com.cactusvilleage.server.challenge.service;

import com.cactusvilleage.server.auth.entities.Member;
import com.cactusvilleage.server.auth.service.MemberService;
import com.cactusvilleage.server.auth.util.SecurityUtil;
import com.cactusvilleage.server.challenge.entities.Challenge;
import com.cactusvilleage.server.challenge.repository.ChallengeRepository;
import com.cactusvilleage.server.challenge.web.dto.request.EnrollDto;
import com.cactusvilleage.server.challenge.web.dto.response.EnrollResponseDto;
import com.cactusvilleage.server.global.exception.BusinessLogicException;
import com.cactusvilleage.server.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChallengeService {

    private final MemberService memberService;
    private final ChallengeRepository challengeRepository;

    public EnrollResponseDto enrollChallenge(EnrollDto enrollDto, String type) {

        // 회원인지 확인
        Member member = memberService.findMember(SecurityUtil.getCurrentMemberId());

        List<Challenge> validStream = challengeRepository.findAll().stream()
                .filter(found -> found.isActive() && found.getMember().getId().equals(SecurityUtil.getCurrentMemberId()))
                .collect(Collectors.toList());

        // 회원 한 명당 하나의 챌린지만 등록할 수 있다
        if (!validStream.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.ENROLL_CHALLENGE_CANNOT_BE_DUPLICATED);
        }

        // Dto <--> Entity 매핑
        Challenge challenge = Challenge.builder()
                .challengeType(Challenge.ChallengeType.valueOf(type.toUpperCase())) // 쿼리파라미터로 받는 것과 Entity 매핑
                .targetDate(enrollDto.getTargetDate())
                .targetTime(enrollDto.getTargetTime())
                .active(true) // 챌린지 등록할 때 active true 설정
                .build();

        challenge.setMember(member);

        challengeRepository.save(challenge);

        // Controller 에서 responseDto 타입을 반환해야하기 때문에 매핑
        return EnrollResponseDto.builder()
                .challengeType(challenge.getChallengeType())
                .active(challenge.isActive())
                .progress(0)
                .build();
    }
}