package com.moneyManager.MoneyManagerAPI.controller;

import org.json.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moneyManager.MoneyManagerAPI.service.CategoryService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/category", produces = "application/json")
public class CategoryController {
    /**
     * the link to categoryService
     */
    @Autowired
    CategoryService categoryService;
    /**
     * Use public function of categoryService to get categories list and return a http repsonse
     * 
     * @param type  income or expenses
     * @return      a list of categories, http response entity (200OK)
     */
    @GetMapping
    public ResponseEntity<?> getCategories(@RequestParam("type") String type) {
        JSONObject result = categoryService.getCategories(type);
        return new ResponseEntity<>(result.toString(), HttpStatus.OK);
    }
    /**
     * Create a new category by calling categoryService.createCategory and return a http response
     * 
     * @param type  income or expenses
     * @param name  the category to be added
     * @return      http response entity (200OK)
     */
    @PostMapping
    public ResponseEntity<?> createCategory(@RequestParam("type") String type, @RequestParam("name") String name) {
        categoryService.createCategory(type, name);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /**
     * Remove a category by calling categoryService.deleteCategory and return a http response
     * 
     * @param type  income or expenses
     * @param name  the category to be removed
     * @return      http response entity (200OK)
     */
    @DeleteMapping
    public ResponseEntity<?> deleteCategory(@RequestParam("type") String type, @RequestParam("name") String name) {
        categoryService.deleteCategory(type, name);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}