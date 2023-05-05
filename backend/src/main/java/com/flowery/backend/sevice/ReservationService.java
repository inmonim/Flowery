package com.flowery.backend.sevice;

import com.flowery.backend.model.dto.ReservationDto;
import com.flowery.backend.model.entity.*;
import com.flowery.backend.repository.*;
import org.springframework.stereotype.Service;

import javax.swing.text.html.parser.Entity;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ReservationService {

    // 예약 거부, 승인, 확인 등이 여기 있음

    private ReservationRepository reservationRepository;
    private StoreRepository storeRepository;
    private UsersRepository usersRepository;
    private GoodsRepository goodsRepository;
    private MessagesRepository messagesRepository;

    ReservationService(ReservationRepository reservationRepository, StoreRepository storeRepository,
                       UsersRepository usersRepository, GoodsRepository goodsRepository, MessagesRepository messagesRepository){
        this.reservationRepository = reservationRepository;
        this.storeRepository = storeRepository;
        this.usersRepository = usersRepository;
        this.goodsRepository = goodsRepository;
        this.messagesRepository = messagesRepository;
    }

    public List<ReservationDto> findTodayReservation(LocalDateTime dateTime){

        LocalDateTime yesterday = LocalDateTime.of(LocalDate.from(dateTime), LocalTime.of(0,0,0));
        LocalDateTime today = LocalDateTime.of(LocalDate.from(dateTime), LocalTime.of(23,59,59));

        List<Reservation> list = reservationRepository.findAllByDateBetween(yesterday,today);
        List<ReservationDto> result = new ArrayList<>();

        for(int i=0; i<list.size(); i++){

            ReservationDto tmp = new ReservationDto();

            reservationEntityToDto(tmp, list.get(i));

            result.add(tmp);
        }

        return result;

    }

    public List<ReservationDto> findByStoreId(int storeId) {
        List<ReservationDto> result = new ArrayList<>();

        Stores store = storeRepository.findById(storeId).get();
        List<Reservation> list = reservationRepository.findByStoreId(store);

        for(int i=0; i<list.size(); i++){

            ReservationDto tmp = new ReservationDto();

            reservationEntityToDto(tmp, list.get(i));

            result.add(tmp);
        }

        return result;


    }

    public ReservationDto acceptReservation (int reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).get();
        reservation.setPermission(1);
        reservationRepository.save(reservation);
        ReservationDto tmp = new ReservationDto();
        reservationEntityToDto(tmp, reservation);

        return tmp;

    }

    public void reservationEntityToDto(ReservationDto tmp, Reservation reservation){

        tmp.setReservationId(reservation.getReservationId());
        tmp.setDate(reservation.getDate());
        tmp.setPrice(reservation.getPrice());
        tmp.setDemand(reservation.getDemand());
        tmp.setPermission(reservation.getPermission());
        tmp.setPrinted(reservation.getPrinted());
        tmp.setUserId(reservation.getUserId().getUsersId());
        tmp.setStoreId(reservation.getStoreId().getStoreId());
        tmp.setGoodsName(reservation.getGoodsName());
        tmp.setReservationName(reservation.getReservationName());
        tmp.setPhrase(reservation.getPhrase());

        return;

    }

    public boolean makeReservation(ReservationDto reservationDto) throws Exception{

        Reservation reservation = new Reservation();
        Users users = usersRepository.findById(reservationDto.getUserId()).get();
        reservation.setUserId(users);

        // store id를 가져와 goods에 해당 제품이 있는지 확인해준다.
        // 해당 제품이 없고 해당 제품과 요청 가격이 같지 않다면 return false를 해준다.
        Stores stores = storeRepository.findById(reservationDto.getStoreId()).get();

        // 가게가 아직 승인되지 않은 가게라면 무조건 false 처리
        if(stores.getPermit()==0){
            return false;
        }

        List<Goods> goods = goodsRepository.findGoodsByStoreId(stores);

        boolean check = true;

        // 올바른 가격과 상품이 선택되었는지 확인함
        for(int i=0; i<goods.size(); i++){
            if(goods.get(i).getGoodsName().equals(reservationDto.getGoodsName()) &&
            goods.get(i).getGoodsPrice() == reservationDto.getPrice()){
                check = false;
            }
        }

        // 만약 아니라면 false 리턴
        if(check){
            return false;
        }

        Messages messages = null;

        // 메시지 아이디가 null값이 아니라면 가져온다.
        if(reservationDto.getMessageId() != null){
            messages = messagesRepository.findById(reservationDto.getMessageId()).get();
        }

        reservation.setStoreId(stores);
        reservation.setMessageId(messages);

        reservation.setGoodsName(reservationDto.getGoodsName());
        reservation.setPrice(reservationDto.getPrice());

        reservation.setDemand(reservationDto.getDemand());
        reservation.setDate(reservationDto.getDate());
        reservation.setPrinted(0);
        reservation.setPermission(0);
        reservation.setReservationName(reservationDto.getReservationName());
        reservation.setPhrase(reservationDto.getPhrase());

        reservationRepository.save(reservation);
        return true;
    }

}
