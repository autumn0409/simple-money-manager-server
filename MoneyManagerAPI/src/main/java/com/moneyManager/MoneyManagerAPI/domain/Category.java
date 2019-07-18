package com.moneyManager.MoneyManagerAPI.domain;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
public class Category {

    @Id
    /**
     * the id of a category (genereated automatically by system)
     */
    String id;
    /**
     * the type of this category belongs to
     */
    String type;
    /**
     * the name of this category
     */
    String name;
    
    public Category() {
        this.type = "";
        this.name = "";
    }
    /**
     * Constructor of a category
     * 
     * @param type  income or expenses
     * @param name  the name of the category
     */
    public Category(String type, String name) {
        this.type = type;
        this.name = name;
    }

}