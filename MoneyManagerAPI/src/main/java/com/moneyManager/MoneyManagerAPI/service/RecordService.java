package com.moneyManager.MoneyManagerAPI.service;

import org.json.*;
import java.util.List;
import java.util.Map;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moneyManager.MoneyManagerAPI.domain.Record;
import com.moneyManager.MoneyManagerAPI.domain.DailyRecords;
import com.moneyManager.MoneyManagerAPI.domain.MonthRecords;
import com.moneyManager.MoneyManagerAPI.repositories.RecordRepository;
import com.moneyManager.MoneyManagerAPI.repositories.DailyRecordsRepository;
import com.moneyManager.MoneyManagerAPI.repositories.MonthRecordsRepository;
import com.moneyManager.MoneyManagerAPI.utils.ParsedDate;

@Service
public class RecordService {
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
     * Return the records in the year/month
     * 
     * @param year  year you want to check
     * @param month month of the year
     * @return      A JSONObject of month-daily statistical result
     */
    public JSONObject getRecords(int year, int month) {

        JSONObject result = new JSONObject();
        JSONArray dailyRecords = new JSONArray();

        MonthRecords findMonthRecordsResult = monthRecordsRepository.findOneByYearAndMonth(year, month);

        if (findMonthRecordsResult == null) {
            result.put("id", "");
            result.put("month", month);
            result.put("income", 0);
            result.put("expenses", 0);
            result.put("dailyRecords", dailyRecords);

            return result;

        } else {
            result.put("id", findMonthRecordsResult.getId());
            result.put("month", month);
            result.put("income", findMonthRecordsResult.getIncome());
            result.put("expenses", findMonthRecordsResult.getExpenses());

            String monthId = findMonthRecordsResult.getId();
            List<DailyRecords> findDailyRecordsResult = dailyRecordsRepository.findByMonthId(monthId);

            if (findDailyRecordsResult.size() == 0) {
                result.put("dailyRecords", dailyRecords);
            } else {
                this.addDailyRecords(dailyRecords, findDailyRecordsResult);
                result.put("dailyRecords", dailyRecords);
            }
        }
        return result;
    }
    /**
     * Create a new record in the database
     * 
     * @param body  input record
     */
    public void createRecord(Map<String, Object> body) {

        long date = (long) (body.get("date"));
        int amount = (int) body.get("amount");
        String type = (String) body.get("type");
        String category = (String) body.get("category");
        String paymentMethod = (String) body.get("paymentMethod");
        String remarks = (String) body.get("remarks");

        ParsedDate parsedDate = new ParsedDate(new Date(date));
        int year = parsedDate.getYear();
        int month = parsedDate.getMonth();
        int day = parsedDate.getDay();

        int income = 0;
        int expenses = 0;

        if (type.equals("expenses"))
            expenses += amount;
        else if (type.equals("income"))
            income += amount;

        String monthId;
        String dayId;

        MonthRecords findMonthRecordsResult = monthRecordsRepository.findOneByYearAndMonth(year, month);

        if (findMonthRecordsResult == null) {

            // create month
            MonthRecords newMonthRecords = new MonthRecords(year, month, income, expenses);
            monthId = newMonthRecords.getId();
            monthRecordsRepository.save(newMonthRecords);

            // create daily
            DailyRecords newDailyRecords = new DailyRecords(monthId, date, income, expenses);
            dayId = newDailyRecords.getId();
            dailyRecordsRepository.save(newDailyRecords);

        } else {

            // update month
            monthId = findMonthRecordsResult.getId();
            this.updateMonthRecordsAmount(type, amount, findMonthRecordsResult, monthRecordsRepository);

            // find daily
            DailyRecords findDailyRecordsResult = dailyRecordsRepository.findOneByMonthIdAndDay(monthId, day);

            if (findDailyRecordsResult == null) {
                // create daily
                DailyRecords newDailyRecords = new DailyRecords(monthId, date, income, expenses);
                dayId = newDailyRecords.getId();
                dailyRecordsRepository.save(newDailyRecords);

            } else {
                // update daily
                dayId = findDailyRecordsResult.getId();
                this.updateDailyRecordsAmount(type, amount, findDailyRecordsResult, dailyRecordsRepository);
            }
        }
        // create record
        Record newRecord = new Record(monthId, dayId, date, type, category, paymentMethod, remarks, amount);
        recordRepository.save(newRecord);
        
    }
    /**
     * Edit record by a new body with the same id as the original record in the database
     * 
     * @param body  Update body of the existing record
     */
    public void editRecord(Map<String, Object> body) {
        
        long date = (long) (body.get("date"));
        int amount = (int) body.get("amount");
        String type = (String) body.get("type");
        String category = (String) body.get("category");
        String paymentMethod = (String) body.get("paymentMethod");
        String remarks = (String) body.get("remarks");
        String id = (String) body.get("id");
        if(id == null)
            return;

        ParsedDate parsedDate = new ParsedDate(new Date(date));
        int year = parsedDate.getYear();
        int month = parsedDate.getMonth();
        int day = parsedDate.getDay();

        int income = 0;
        int expenses = 0;

        if (type.equals("expenses"))
            expenses += amount;
        else if (type.equals("income"))
            income += amount;

        String monthId;
        String dayId;

        // find new month
        MonthRecords findMonthRecordsResult = monthRecordsRepository.findOneByYearAndMonth(year, month);
        // update new month
        if (findMonthRecordsResult == null) {

            // create month
            MonthRecords newMonthRecords = new MonthRecords(year, month, income, expenses);
            monthId = newMonthRecords.getId();
            monthRecordsRepository.save(newMonthRecords);

            // create daily
            DailyRecords newDailyRecords = new DailyRecords(monthId, date, income, expenses);
            dayId = newDailyRecords.getId();
            dailyRecordsRepository.save(newDailyRecords);

        } else {

            // update month
            monthId = findMonthRecordsResult.getId();
            this.updateMonthRecordsAmount(type, amount, findMonthRecordsResult, monthRecordsRepository);

            // find daily
            DailyRecords findDailyRecordsResult = dailyRecordsRepository.findOneByMonthIdAndDay(monthId, day);

            if (findDailyRecordsResult == null) {
                // create daily
                DailyRecords newDailyRecords = new DailyRecords(monthId, date, income, expenses);
                dayId = newDailyRecords.getId();
                dailyRecordsRepository.save(newDailyRecords);

            } else {
                // update daily
                dayId = findDailyRecordsResult.getId();
                this.updateDailyRecordsAmount(type, amount, findDailyRecordsResult, dailyRecordsRepository);
            }
        }
        Record tmp = recordRepository.findById(id).get();
        String old_type = tmp.getType();
        int old_amount = tmp.getAmount();
        String old_monthId = tmp.getMonthId();
        String old_dayId = tmp.getDayId();

        // find original month
        MonthRecords old_findMonthRecordsResult = monthRecordsRepository.findById(old_monthId).get();
        // update original month
        this.updateMonthRecordsAmount(old_type, -old_amount, old_findMonthRecordsResult, monthRecordsRepository);

        // find original daily
        DailyRecords old_findDailyRecordsResult = dailyRecordsRepository.findById(old_dayId).get();
        // update original daily
        this.updateDailyRecordsAmount(old_type, -old_amount, old_findDailyRecordsResult, dailyRecordsRepository);

        // set
        tmp.setAmount(amount);
        tmp.setMonthId(monthId);
        tmp.setDayId(dayId);
        tmp.setCategory(category);
        tmp.setPaymentMethod(paymentMethod);
        tmp.setRemarks(remarks);
        tmp.setAmount(amount);
        tmp.setDate(date);

        recordRepository.save(tmp);

        if(old_findMonthRecordsResult.getExpenses() == 0 && old_findMonthRecordsResult.getIncome() == 0)
            monthRecordsRepository.deleteById(old_monthId);
        if(old_findDailyRecordsResult.getExpenses() == 0 && old_findDailyRecordsResult.getIncome() == 0)
            dailyRecordsRepository.deleteById(old_dayId);
        
    }
    /**
     * Delete a record by id
     * 
     * @param id record id
     */
    public void deleteRecord(String id) {

        Record tmp = recordRepository.findById(id).get();
        String type = tmp.getType();
        int amount = tmp.getAmount();
        String monthId = tmp.getMonthId();
        String dayId = tmp.getDayId();

        // find month
        MonthRecords findMonthRecordsResult = monthRecordsRepository.findById(monthId).get();
        // update month
        this.updateMonthRecordsAmount(type, -amount, findMonthRecordsResult, monthRecordsRepository);

        // find daily
        DailyRecords findDailyRecordsResult = dailyRecordsRepository.findById(dayId).get();
        // update daily
        this.updateDailyRecordsAmount(type, -amount, findDailyRecordsResult, dailyRecordsRepository);

        recordRepository.deleteById(id);
        if(findDailyRecordsResult.getExpenses() == 0 && findDailyRecordsResult.getIncome() == 0)
            dailyRecordsRepository.deleteById(dayId);
        if(findMonthRecordsResult.getExpenses() == 0 && findMonthRecordsResult.getIncome() == 0)
            monthRecordsRepository.deleteById(monthId);
    }

    /**
     * Update income or expenses in MonthRecords object.
     * 
     * @param type                   record type
     * @param amount                 record amount
     * @param findResult             target object
     * @param monthRecordsRepository repository of monthRecords
     */
    private void updateMonthRecordsAmount(String type, int amount, MonthRecords findResult,
            MonthRecordsRepository monthRecordsRepository) {
        if (type.equals("income"))
            findResult.setIncome(findResult.getIncome() + amount);

        else if (type.equals("expenses"))
            findResult.setExpenses(findResult.getExpenses() + amount);

        monthRecordsRepository.save(findResult);
    }

    /**
     * Update income or expenses in DailyRecords object.
     * 
     * @param type                   record type
     * @param amount                 record amount
     * @param findResult             target object
     * @param dailyRecordsRepository repository of dailyRecords
     */
    private void updateDailyRecordsAmount(String type, int amount, DailyRecords findResult,
            DailyRecordsRepository dailyRecordsRepository) {

        if (type.equals("income"))
            findResult.setIncome(findResult.getIncome() + amount);

        else if (type.equals("expenses"))
            findResult.setExpenses(findResult.getExpenses() + amount);

        dailyRecordsRepository.save(findResult);
    }

    /**
     * Add daily records into dailyRecords array.
     * 
     * @param dailyRecords           empty JSONArray
     * @param findDailyRecordsResult list of DailyRecords that fit the result of
     *                               findByMonthId
     */
    private void addDailyRecords(JSONArray dailyRecords, List<DailyRecords> findDailyRecordsResult) {
        for (DailyRecords d : findDailyRecordsResult) {

            JSONObject dailyRecord = new JSONObject();
            dailyRecord.put("id", d.getId());
            dailyRecord.put("date", d.getDate());
            dailyRecord.put("income", d.getIncome());
            dailyRecord.put("expenses", d.getExpenses());

            String dayId = d.getId();
            List<Record> findRecordResult = recordRepository.findByDayId(dayId);

            JSONArray recordItems = new JSONArray();

            if (findRecordResult.size() == 0) {
                dailyRecord.put("recordItems", recordItems);
            } else {
                this.addRecordItems(recordItems, findRecordResult);
                dailyRecord.put("recordItems", recordItems);
            }
            dailyRecords.put(dailyRecord);
        }
    }

    /**
     * Add record items into recordItems array.
     * 
     * @param recordItems      empty JSONArray
     * @param findRecordResult list of Record that fit the result of findBtDayId
     */
    private void addRecordItems(JSONArray recordItems, List<Record> findRecordResult) {
        for (Record r : findRecordResult) {
            JSONObject recordItem = new JSONObject();

            recordItem.put("id", r.getId());
            recordItem.put("date", r.getDate());
            recordItem.put("type", r.getType());
            recordItem.put("category", r.getCategory());
            recordItem.put("paymentMethod", r.getPaymentMethod());
            recordItem.put("remarks", r.getRemarks());
            recordItem.put("amount", r.getAmount());

            recordItems.put(recordItem);
        }
    }

}
