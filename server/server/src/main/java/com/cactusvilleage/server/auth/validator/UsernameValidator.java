package com.cactusvilleage.server.auth.validator;

import com.cactusvilleage.server.auth.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@RequiredArgsConstructor
public class UsernameValidator implements ConstraintValidator<UsernameNotDuplicate, String> {
    private final MemberRepository memberRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !memberRepository.existsByUsername(value);
    }
}