package com.moneyManager.MoneyManagerAPI.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.moneyManager.MoneyManagerAPI.domain.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

    /**
     * Find the categories of the type
     * 
     * @param type  income or expenses
     * @return      a list of categories
     */
    List<Category> findByType(String type);

    /**
     * Remove a category in database
     * 
     * @param type  the type of the category you want to remove
     * @param name  the name of the category you want to remove
     * @return      a list of categories
     */
    @Query(value = "{ 'type': ?0, 'name': ?1 }", delete = true)
    List<Category> deleteCategory(String type, String name);
}