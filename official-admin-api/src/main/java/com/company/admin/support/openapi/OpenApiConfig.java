package com.company.admin.support.openapi;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI adminOpenApi() {
        return new OpenAPI().info(new Info().title("official-admin-api").version("v1").description("留学教育机构后台管理 API"));
    }
}
