package com.moneyManager.MoneyManagerAPI.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.moneyManager.MoneyManagerAPI.utils.ParsedDate;;

@Getter
@Setter
@Document
public class DailyRecords {

    @Id
    /**
     * the id of daily record (Automatically generated bt system)
     */
    String id;
    /**
     * the month id shows the month record which this daily record belongs to
     */
    String monthId;
    /**
     * the amount of income in this day
     */
    int income;
    /**
     * the amount of expenses in this day
     */
    int expenses;
    /**
     * what day is today in this month
     */
    int day;
    /**
     * the amount of miilisecond from 1970/01/01 00:00 to the record time
     */
    long date;
    /**
     * Construct the dault record
     * 
     * @param monthId   the id of the month record which this daily record belongs to
     * @param date      the amount of miilisecond from 1970/01/01 00:00 to the record time
     * @param income    the amount of income in this day
     * @param expenses  the amount of expenses in this day
     */
    public DailyRecords(String monthId, long date, int income, int expenses) {
        this.id = UUID.randomUUID().toString();
        this.monthId = monthId;
        this.date = date - date%86400000;
        this.day = new ParsedDate(new Date(date)).getDay();
        this.income = income;
        this.expenses = expenses;
    }


}