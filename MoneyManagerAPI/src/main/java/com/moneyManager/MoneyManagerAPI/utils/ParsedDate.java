package com.moneyManager.MoneyManagerAPI.utils;

import lombok.Getter;
import lombok.Setter;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * ParseDate
 */
@Getter
@Setter
public class ParsedDate {

    Calendar cal;
    int year;
    int month;
    int day;

    public ParsedDate(Date date) {
        this.cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Taipei"));
        this.cal.setTime(date);

        this.year = cal.get(Calendar.YEAR);
        this.month = cal.get(Calendar.MONTH) + 1;
        this.day = cal.get(Calendar.DAY_OF_MONTH);
    }
}