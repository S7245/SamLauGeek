---
sidebar_position: 1
---

# 分页插件

## 项目配置

### 添加分页依赖

```xml
<!-- https://mvnrepository.com/artifact/com.baomidou/mybatis-plus-jsqlparser -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-jsqlparser</artifactId>
    <version>3.5.12</version>
</dependency>
```

### 添加插件配置

```java
@Configuration
@MapperScan("org.sam.mybatisplus.demo_mybatis_plus.mapper") // 这里添加后，可以把主类中的Scan删除；
public class MybatisPlusConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor(){
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor( new PaginationInnerInterceptor(DbType.MYSQL)); // 如果配置多个插件, 切记分页最后添加
        // 如果有多数据源可以不配具体类型, 否则都建议配上具体的 DbType
        return interceptor;
    }
}
```

### 项目结构

```
.
├── DemoMybatisPlusApplication.java
├── config
│     └── MybatisPlusConfig.java
├── mapper
│     ├── ContentMapper.java
│     └── UserMapper.java
├── pojo
│     ├── Content.java
│     └── User.java
└── service
    ├── ContentService.java
    ├── UserService.java
    └── impl
        ├── ContentServiceImpl.java
        └── UserServiceImpl.java
```

- 在使用多个插件时，请将分页插件放到插件执行链的最后面，以避免 COUNT SQL 执行不准确的问题。
