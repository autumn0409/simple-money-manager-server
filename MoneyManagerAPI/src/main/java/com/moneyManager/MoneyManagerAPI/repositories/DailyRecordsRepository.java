package com.moneyManager.MoneyManagerAPI.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.moneyManager.MoneyManagerAPI.domain.DailyRecords;

@Repository
public interface DailyRecordsRepository extends MongoRepository<DailyRecords, String> {
    /**
     * Find a list of daily reocords by monthid
     * 
     * @param monthId   the monthid you want to search
     * @return          a list of daily records
     */
    List<DailyRecords> findByMonthId(String monthId);
    /**
     * Find a daily record by monthid and daily id
     * 
     * @param monthId   the monthid you want to search
     * @param day       the day you want to search
     * @return          a daily record
     */
    DailyRecords findOneByMonthIdAndDay(String monthId, int day);
}