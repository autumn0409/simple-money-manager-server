package com.moneyManager.MoneyManagerAPI.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.moneyManager.MoneyManagerAPI.domain.Record;

@Repository
public interface RecordRepository extends MongoRepository<Record, String> {
    /**
     * Find a list of records by dayid
     * 
     * @param dayId the dayid of the day you want to search
     * @return      a list of records
     */
    List<Record> findByDayId(String dayId);
    /**
     * Find a list of records by monthId
     * 
     * @param monthId the monthId of the month you want to search
     * @return      a list of records
     */
    List<Record> findByMonthId(String monthId);
}