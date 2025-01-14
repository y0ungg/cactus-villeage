package com.cactusvilleage.server.auth.entities;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "token")
@Builder
public class RefreshToken {
    @Id
    private String tokenId;
    private String memberId;
    private String tokenValue;
}
