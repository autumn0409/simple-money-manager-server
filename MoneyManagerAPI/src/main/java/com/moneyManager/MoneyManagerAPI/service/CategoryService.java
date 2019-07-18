package com.moneyManager.MoneyManagerAPI.service;

import org.json.*;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moneyManager.MoneyManagerAPI.domain.Category;
import com.moneyManager.MoneyManagerAPI.repositories.CategoryRepository;

@Service
public class CategoryService {

    /**
     * the link to category database
     */
    @Autowired
    CategoryRepository categoryRepository;
    /**
     * Return the categories of income type or expenses type
     * 
     * @param type  income or expenses
     * @return      JSONObject of list of categories
     */
    public JSONObject getCategories(String type) {
        JSONObject result = new JSONObject();
        JSONArray categories = new JSONArray();

        List<Category> findResult = categoryRepository.findByType(type);

        for (int i = 0; i < findResult.size(); i++) {
            categories.put(findResult.get(i).getName());
        }

        result.put("categories", categories);

        return result;
    }
    /**
     * Create a new category in the type
     * 
     * @param type  income or expenese
     * @param name  new category name
     */
    public void createCategory(String type, String name) {
        Category newCategory = new Category(type, name);
        categoryRepository.save(newCategory);
    }
    /**
     * Remove the category in the type
     * 
     * @param type  income or expenses
     * @param name  the category you want to remove
     */
    public void deleteCategory(String type, String name) {
        categoryRepository.deleteCategory(type, name);
    }
}