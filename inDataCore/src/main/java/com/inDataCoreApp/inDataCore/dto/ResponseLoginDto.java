package com.inDataCoreApp.inDataCore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
public class ResponseLoginDto {
    private String email;
    private String accessToken;
}
