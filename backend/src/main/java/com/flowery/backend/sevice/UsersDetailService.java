package com.flowery.backend.sevice;

import com.flowery.backend.jwt.UsersDetail;
import com.flowery.backend.model.entity.Seller;
import com.flowery.backend.model.entity.Users;
import com.flowery.backend.repository.SellerRepository;
import com.flowery.backend.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsersDetailService implements UserDetailsService {

    private final UsersRepository usersRepository;
    private final SellerRepository sellerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = usersRepository.findById(username);

        if(users == null){
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }

        return new UsersDetail(users,"ROLE_USER");
    }

    public UserDetails loadSellerByUserId(String username) throws UsernameNotFoundException {
        Users users = usersRepository.findById(username);
        Seller isSeller = sellerRepository.findByUserId(users);
        if(isSeller==null){
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }else{
            return new UsersDetail(users, "ROLE_SELLER");
        }
    }


}