# MyBatis Plus

https://blogs7245-1256587996.cos.ap-guangzhou.myqcloud.com/backend/

![](https://blogs7245-1256587996.cos.ap-guangzhou.myqcloud.com/backend/20250705001.png)


## 数据库(Mysql)

- driver-clas-name：
	- SpringBoot2.0(内置jdbc5驱动)，驱动类的使用：`com.mysql.jdbc.Driver`
	- SpringBoot2.1及以上(内置jdbc8驱动)，驱动类的使用：`com.mysql.cj.jdbc.Driver`
- 连接本地URL：
	- Mysql5.7版本的URL: jdbc:mysql://localhost:3306/your_database?useSSL=false&characterEncoding=utf8
	- Mysql8.0版本的URL: jdbc:mysql://localhost:3306/your_database?useSSL=false&serverTimezone=GMT%2B8&characterEncoding=utf8


```yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/your_database?characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai
    username: your_username
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true


spring:
  datasource:
    url: jdbc:mysql://localhost:3306/your_database?useSSL=false&serverTimezone=Asia/Shanghai&characterEncoding=utf8
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        jdbc:
          time_zone: Asia/Shanghai
```

启动类

> 在 SpringBoot启动类中添加`@MapperScan`注解，扫描 mapper 包：

```java
@SpringBootApplication
@MapperScan("org.sam.mybatisplus.demo_mybatis_plus.mapper")
public class DemoMybatisPlusApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoMybatisPlusApplication.class, args);
    }
}

/*
├── java
│   └── org
│       └── sam
│           └── mybatisplus
│               └── demo_mybatis_plus
│                   ├── DemoMybatisPlusApplication.java
│                   └── mapper <--- mapper包的位置，对应的 Scan 位置
└── resources
    ├── application.yml
    ├── static
    └── templates
*/
```


- `BaseMapper` 有很多已经实现了的接口功能：

![](https://blogs7245-1256587996.cos.ap-guangzhou.myqcloud.com/backend/20250705002.png)

## lombok

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class User {
    private Long id;
    private  String name;
    private Integer age;
    private  String email;
}
// 上面的一批注解，直接可以使用 @Data 就行；
// 给 User 添加了 @Data 注解后，要重新进行编译
@Data
public class User {
    private Long id;
    private  String name;
    private Integer age;
    private  String email;
}
```



## 项目错误的时候按照下面去检查

![](https://blogs7245-1256587996.cos.ap-guangzhou.myqcloud.com/backend/20250705003.png)



## 设置表前缀

> 假如表的名称：`t_user`

- 方式1:

```java
@TableName("t_user")
public class User {
}
```

- 方式2:全局加

```yml
mybatis-plus:
  global-config:
    db-config:
      table-prefix: t_
```

## TableId

```java
@Data
public class User {
    // 将属性所对应的字段指定为主键
    @TableId
    private Long uid;
    private  String name;
    // ...
}
```

这时的 `user` 表字段对应的是：

```sql
CREATE TABLE `user`
(
    uid BIGINT NOT NULL COMMENT '主键ID',
    name VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
    PRIMARY KEY (uid)
);
```

如果 `uid` 不加 `@TableId`，那么报错信息：`Filed 'uid' does't have a default value.`

```java
    @Test
    public void testInsertUser() {
        User user = new User();
        user.setName("张三");
        user.setAge(28);
        user.setEmail("zhangsan@example.com");

        int result = userMapper.insert(user);
        System.out.println("插入结果：" + result); // 返回插入成功的行数
    }
```

### Value


**如果数据库中的主键字段为 `uid`，POJO 中的 `User` 字段为：`id`，那么需要更新为：**

```java
@Data
public class User {
    @TableId(value = "uid")
    private Long id;
}
```

### Type

```java
// https://baomidou.com/reference/#idtype
// IdType.AUTO：使用数据库自增 ID 作为主键。
// IdType.NONE：无特定生成策略，如果全局配置中有 IdType 相关的配置，则会跟随全局配置。
// IdType.INPUT：在插入数据前，由用户自行设置主键值。
// IdType.ASSIGN_ID：自动分配 ID，适用于 Long、Integer、String 类型的主键。默认使用雪花算法通过 IdentifierGenerator 的 nextId 实现。@since 3.3.0
// IdType.ASSIGN_UUID：自动分配 UUID，适用于 String 类型的主键。默认实现为 IdentifierGenerator 的 nextUUID 方法。@since 3.3.0
public enum IdType {
    AUTO(0), 
    NONE(1),
    INPUT(2),
    ASSIGN_ID(3),
    ASSIGN_UUID(4);
}

public class User {
    @TableId(value = "uid",type = IdType.ASSIGN_ID)
    private Long id;
    private  String name;
}
```

- 全局设置：

```yml
mybatis-plus:
  global-config:
    db-config:
      id-type: auto
```




















