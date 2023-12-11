package com.inDataCoreApp.inDataCore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data @AllArgsConstructor @NoArgsConstructor
public class ProductDto {
    private String name;
    private String description;
    private double price;
}
