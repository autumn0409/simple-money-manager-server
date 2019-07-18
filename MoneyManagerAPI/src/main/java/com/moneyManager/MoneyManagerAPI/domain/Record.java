package com.moneyManager.MoneyManagerAPI.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Record
 */
@Getter
@Setter
@Document
public class Record {

    @Id
    /**
     * the id of record (Automatically generated bt system)
     */
    String id;
    /**
     * the month id shows the month record which this record belongs to
     */
    String monthId;
    /**
     * the day id shows the daily record which this record belongs to
     */
    String dayId;
    /**
     * the type of this record, income or expenses
     */
    String type;
    /**
     * the category of this record
     */
    String category;
    /**
     * the patmentMethod of this record 
     */
    String paymentMethod;
    /**
     * some comment of this record
     */
    String remarks;
    /**
     * the income or expenses amount of this record
     */
    int amount;
    /**
     * the amount of miilisecond from 1970/01/01 00:00 to the record time
     */
    long date;
    /**
     * Construct a record in database
     * 
     * @param monthId       month id shows the month record which this record belongs to
     * @param dayId         the day id shows the daily record which this record belongs to
     * @param date          the amount of miilisecond from 1970/01/01 00:00 to the record time
     * @param type          the type of this record, income or expenses
     * @param category      the category of this record
     * @param paymentMethod the patmentMethod of this record
     * @param remarks       some comment of this record
     * @param amount        the income or expenses amount of this record
     */
    public Record(String monthId, String dayId, long date, String type, String category, String paymentMethod,
            String remarks, int amount) {
        this.id = UUID.randomUUID().toString();
        this.monthId = monthId;
        this.dayId = dayId;
        this.date = date;
        this.type = type;
        this.category = category;
        this.paymentMethod = paymentMethod;
        this.remarks = remarks;
        this.amount = amount;
    }
}