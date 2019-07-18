package com.moneyManager.MoneyManagerAPI.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.moneyManager.MoneyManagerAPI.domain.MonthRecords;

@Repository
public interface MonthRecordsRepository extends MongoRepository<MonthRecords, String> {
    /**
     * Find a month record by year and month
     * 
     * @param year  the year input
     * @param month the month input
     * @return      a month record
     */
    MonthRecords findOneByYearAndMonth(int year, int month);
}