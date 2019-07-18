package com.moneyManager.MoneyManagerAPI.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
public class MonthRecords {

    @Id
    /**
     * the id of month record (Automatically generated bt system)
     */
    String id;
    /**
     * the year of this month record
     */
    int year;
    /**
     * the month of this month record
     */
    int month;
    /**
     * the amount of income in this day
     */
    int income;
    /**
     * the amount of expenses in this day
     */
    int expenses;
    /**
     * Construct a month record with year, month, income and expenses
     * 
     * @param year      the year of this month record
     * @param month     the month of this month record
     * @param income    the amount of income in this day
     * @param expenses  the amount of expenses in this day
     */
    public MonthRecords(int year, int month, int income, int expenses) {
        this.id = UUID.randomUUID().toString();
        this.year = year; 
        this.month = month;
        this.income = income;
        this.expenses = expenses;
    }

}