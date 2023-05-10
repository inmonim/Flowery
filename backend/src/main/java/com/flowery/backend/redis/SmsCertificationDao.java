package com.flowery.backend.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.*;
import org.springframework.stereotype.Repository;

import java.time.Duration;

@RequiredArgsConstructor
@Repository
public class SmsCertificationDao {
    private final int LIMIT_TIME = 3 * 60;  // (2)

    private final StringRedisTemplate stringRedisTemplate;

    public void createSmsCertification(String phone, String certificationNumber) { //(3)
        stringRedisTemplate.opsForValue()
                .set(phone, certificationNumber, Duration.ofSeconds(LIMIT_TIME));

    }

    public String getSmsCertification(String phone) { // (4)
        return stringRedisTemplate.opsForValue().get(phone);
    }

    public void removeSmsCertification(String phone) { // (5)
        stringRedisTemplate.delete(phone);
    }

    public boolean hasKey(String phone) {  //(6)
        return stringRedisTemplate.hasKey(phone);
    }
}