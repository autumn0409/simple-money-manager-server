package com.moneyManager.MoneyManagerAPI.controller;

import java.util.Map;
import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moneyManager.MoneyManagerAPI.service.RecordService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/record", produces = "application/json")
public class RecordController {
    /**
     * the link to recordService
     */
    @Autowired
    RecordService recordService;
    /**
     * Get a list of records by calling recordService.getRecords 
     * 
     * @param year  the year input
     * @param month the month input
     * @return      a list of records ,http response entity (200OK)
     */
    @GetMapping
    public ResponseEntity<?> getRecords(@RequestParam("year") int year, @RequestParam("month") int month) {
        JSONObject result = recordService.getRecords(year, month);
        return new ResponseEntity<>(result.toString(), HttpStatus.OK);
    }
    /**
     * Create a new record in database by calling recordService.createrecord
     * 
     * @param body the body of record you want to create
     * @return      http response entity (200OK)
     */
    @PostMapping
    public ResponseEntity<?> createRecord(@RequestBody Map<String, Object> body) {

        recordService.createRecord(body);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /**
     * Update a record in database by calling recordService.editRecord
     * 
     * @param body  the body of record you want to update
     * @return      http response entity (200OK)
     */
    @PutMapping
    public ResponseEntity<?> editRecord(@RequestBody Map<String, Object> body) {
        recordService.editRecord(body);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /**
     * Remove a record in database by calling recordService.deleteRecord
     * 
     * @param id    the id of the record you want to remove
     * @return      http response entity (200OK)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable("id") String id) {
        recordService.deleteRecord(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    
}
