package com.moneyManager.MoneyManagerAPI.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moneyManager.MoneyManagerAPI.domain.MonthRecords;
import com.moneyManager.MoneyManagerAPI.domain.Record;
import com.moneyManager.MoneyManagerAPI.repositories.DailyRecordsRepository;
import com.moneyManager.MoneyManagerAPI.repositories.MonthRecordsRepository;
import com.moneyManager.MoneyManagerAPI.repositories.RecordRepository;

@Service
public class ChartService {
    /**
     * the link to record database
     */
    @Autowired
    RecordRepository recordRepository;
    /**
     * the link to month record database
     */
    @Autowired
    MonthRecordsRepository monthRecordsRepository;
    /**
     * the link to daily record database 
     */
    @Autowired
    DailyRecordsRepository dailyRecordsRepository;
    /**
     * Return the statistic result of amount of income or expenses type of this month in this year
     * 
     * @param year  year you want to check
     * @param month month in the year
     * @param type  income or expenses
     * @return      map of categories and corresponding values
     */
    public Map<String, Integer> statistic(int year, int month, String type) {

        MonthRecords findMonthRecordsResult = monthRecordsRepository.findOneByYearAndMonth(year, month);
        if (findMonthRecordsResult == null) {
            return Collections.<String, Integer>emptyMap();
        }

        String monthId = findMonthRecordsResult.getId();
        List<Record> findDailyRecordsResult = recordRepository.findByMonthId(monthId);

        Iterator<Record> it = findDailyRecordsResult.iterator();
        Map<String, Integer> map = new HashMap<String, Integer>();

        while (it.hasNext()) {
            // System.out.println("Is working!!!!!!!!!!!!!");
            Record tmp = it.next();
            String category_tmp = tmp.getCategory();
            int amount_tmp = tmp.getAmount();
            if (tmp.getType().equals(type)) {
                if (map.containsKey(category_tmp)) {
                    map.replace(category_tmp, map.get(category_tmp) + amount_tmp);
                } else {
                    map.put(category_tmp, amount_tmp);
                }
            }
        }
        return map;
    }

}