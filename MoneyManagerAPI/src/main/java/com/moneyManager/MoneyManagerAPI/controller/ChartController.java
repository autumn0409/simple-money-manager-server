package com.moneyManager.MoneyManagerAPI.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moneyManager.MoneyManagerAPI.service.ChartService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/chart", produces = "application/json")
public class ChartController {
    /**
     * the link to chartService
     */
    @Autowired
    ChartService chartService;
    /**
     * Get the statistical result of the year and month by calling chartService.statistic
     * 
     * @param year  the year input
     * @param month the month input
     * @param type  income or expenses
     * @return      a map <key, value> key = category, value = amount sum, http response (200OK)
     */
    @GetMapping
    public ResponseEntity<?> getChartByYearAndMonth(@RequestParam("year") int year, @RequestParam("month") int month,
            @RequestParam("type") String type) {
        Map<String, Integer> result = chartService.statistic(year, month, type);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}