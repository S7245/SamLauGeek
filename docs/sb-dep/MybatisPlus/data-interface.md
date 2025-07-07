# 持久层接口

## Service Interface

```java
// IService 是 MyBatis-Plus 提供的一个通用 Service 层接口，它封装了常见的 CRUD 操作
public interface ContentService extends IService<Content> {}
```

### save

```java
// 插入一条记录（选择字段，策略插入）
// boolean，表示插入操作是否成功
boolean save(T entity);
// 插入（批量）
boolean saveBatch(Collection<T> entityList);
// 插入（批量）
// batchSize: 插入批次数量
boolean saveBatch(Collection<T> entityList, int batchSize);
```

#### save(插入一条记录)
#### saveBatch(entityList)
#### saveBatch(entityList,batchSize)

```java
@SpringBootTest
public class MybatisPlusTest {
    @Autowired
    private UserService userService;

    @Test
    public void testInsertBatch(){
        List<User> users = Arrays.asList(
                new User("A1",10,"abc@cde.com"),
                new User("A2",10,"abc@cde.com"),
                new User("A3",10,"abc@cde.com"),
                new User("A4",10,"abc@cde.com"),
                new User("A5",10,"abc@cde.com")
        );

        boolean result = userService.saveBatch(users, 2);
        if (result) {
            System.out.println("Users saved successfully.");
        } else {
            System.out.println("Failed to save users.");
        }
    }

}

/*
// 第一批次
==>  Preparing: INSERT INTO user ( id, name, age, email ) VALUES ( ?, ?, ?, ? )
==> Parameters: 1941732979968376834(Long), A1(String), 10(Integer), abc@cde.com(String)
==> Parameters: 1941732980467499009(Long), A2(String), 10(Integer), abc@cde.com(String)
// 第三批次
==>  Preparing: INSERT INTO user ( id, name, age, email ) VALUES ( ?, ?, ?, ? )
==> Parameters: 1941732980693991426(Long), A3(String), 10(Integer), abc@cde.com(String)
==> Parameters: 1941732980714962946(Long), A4(String), 10(Integer), abc@cde.com(String)
// 第三批次
==>  Preparing: INSERT INTO user ( id, name, age, email ) VALUES ( ?, ?, ?, ? )
==> Parameters: 1941732980735934466(Long), A5(String), 10(Integer), abc@cde.com(String)
*/
```

### saveOrUpdate

> 功能描述： 根据实体对象的主键 ID 进行判断，存在则更新记录，否则插入记录。

```java
// TableId 注解属性值存在则更新记录，否插入一条记录
// boolean，表示插入或更新操作是否成功。
boolean saveOrUpdate(T entity);
// 根据updateWrapper尝试更新，否继续执行saveOrUpdate(T)方法
boolean saveOrUpdate(T entity, Wrapper<T> updateWrapper);
// 批量修改插入
boolean saveOrUpdateBatch(Collection<T> entityList);
// 批量修改插入
// batchSize: 插入批次数量
boolean saveOrUpdateBatch(Collection<T> entityList, int batchSize);
```

#### saveOrUpdateBatch

```java
// 假设有一组 User 实体对象，每个对象都有 id 属性
List<User> users = Arrays.asList(
    new User(1, "Alice", "alice@example.com"),
    new User(2, "Bob", "bob@example.com"),
    new User(3, "Charlie", "charlie@example.com")
);
// 使用默认批次大小进行批量修改插入
boolean result = userService.saveOrUpdateBatch(users); // 调用 saveOrUpdateBatch 方法，默认批次大小
if (result) {
    System.out.println("Users updated or saved successfully.");
} else {
    System.out.println("Failed to update or save users.");
}

/*
生成的 SQL（假设 id 为 1 和 2 的记录已存在，id 为 3 的记录不存在）:
UPDATE user SET name = 'Alice', email = 'alice@example.com' WHERE id = 1
UPDATE user SET name = 'Bob', email = 'bob@example.com' WHERE id = 2
INSERT INTO user (id, name, email) VALUES (3, 'Charlie', 'charlie@example.com')
*/ 
```

### remove

> 通过指定条件删除符合条件的记录

```java
// 根据 queryWrapper 设置的条件，删除记录
// queryWrapper: 实体包装类 QueryWrapper
boolean remove(Wrapper<T> queryWrapper);
// 根据 主键ID 删除
boolean removeById(Serializable id);
// 根据 columnMap 条件，删除记录
boolean removeByMap(Map<String, Object> columnMap);
// 删除（根据ID 批量删除）
boolean removeByIds(Collection<? extends Serializable> idList);
```

#### remove(queryWrapper)

```java
@SpringBootTest
public class MybatisPlusTest {
    @Autowired
    private UserService userService;

    @Test
    public void testRemoveRecord(){
        LambdaQueryWrapper<User> userWrapper = new LambdaQueryWrapper<>();
        userWrapper.eq(User::getName, "张三");

        boolean result = userService.remove(userWrapper);
        if (result) {
            System.out.println("Record deleted successfully.");
        } else {
            System.out.println("Failed to delete record.");
        }
    }
}

/*
==>  Preparing: DELETE FROM user WHERE (name = ?)
==> Parameters: 张三(String)
```
#### removeByMap

```java
@Test
public void testRemoveByMap(){
    HashMap<String, Object> columMap = new HashMap<>();
    columMap.put("name","A1");
    boolean result = userService.removeByMap(columMap);
}
```

### update

> 通过指定条件更新符合条件的记录。

```java
// 根据 UpdateWrapper 条件，更新记录 需要设置sqlset
boolean update(Wrapper<T> updateWrapper);
// 根据 whereWrapper 条件，更新记录
boolean update(T updateEntity, Wrapper<T> whereWrapper);
// 根据 ID 选择修改
boolean updateById(T entity);
// 根据ID 批量更新
boolean updateBatchById(Collection<T> entityList);
// 根据ID 批量更新
boolean updateBatchById(Collection<T> entityList, int batchSize);
```

#### update(updateWrapper)

```java
@Test
public void testUpdate(){
    LambdaUpdateWrapper<User> updateWrapper = new LambdaUpdateWrapper<>();
    updateWrapper.eq(User::getName,"A1").set(User::getEmail,"111@BB.com");

    boolean result = userService.update(updateWrapper);
    if (result) {
        System.out.println("Record updated successfully.");
    } else {
        System.out.println("Failed to update record.");
    }
}
/*
==>  Preparing: UPDATE user SET email=? WHERE (name = ?)
==> Parameters: 111@BB.com(String), A1(String)
<==    Updates: 1
*/ 

// 可以等同于：
@Test
public void testUpdateWhereWrapper(){
    User user = new User();
    user.setEmail("222@bb.com");

    LambdaUpdateWrapper<User> updateWrapper = new LambdaUpdateWrapper<>();
    updateWrapper.eq(User::getName,"A1");

    boolean result = userService.update(user,updateWrapper);
}
```

#### updateById(entity)

```java
// 假设有一个 User 实体对象，设置更新字段为 email，根据 ID 更新
User updateEntity = new User();
updateEntity.setId(1);
updateEntity.setEmail("updated.email@example.com");
boolean result = userService.updateById(updateEntity); // 调用 updateById 方法

// UPDATE user SET email = 'updated.email@example.com' WHERE id = 1
```

#### updateBatchById(entityList)

```java
// 假设有一组 User 实体对象，批量更新
List<User> users = Arrays.asList(
    new User(1, null, "new.email1@example.com"),
    new User(2, null, "new.email2@example.com")
);
boolean result = userService.updateBatchById(users); // 调用 updateBatchById 方法，默认批次大小

/*
UPDATE user SET email = 'new.email1@example.com' WHERE id = 1
UPDATE user SET email = 'new.email2@example.com' WHERE id = 2
*/ 
```

### get

> 根据指定条件查询符合条件的记录。

```java
// 根据 ID 查询
T getById(Serializable id);
// 根据 Wrapper，查询一条记录。结果集，如果是多个会抛出异常，随机取一条加上限制条件 wrapper.last("LIMIT 1")
T getOne(Wrapper<T> queryWrapper);
// 根据 Wrapper，查询一条记录
T getOne(Wrapper<T> queryWrapper, boolean throwEx);
// 根据 Wrapper，查询一条记录
Map<String, Object> getMap(Wrapper<T> queryWrapper);
// 根据 Wrapper，查询一条记录
<V> V getObj(Wrapper<T> queryWrapper, Function<? super Object, V> mapper);
```

| 类型 | 参数名 | 描述|
|--|--|--|
| Serializable | id | 主键 ID|
| `Wrapper<T>` | queryWrapper | 实体对象封装操作类 QueryWrapper|
| boolean | throwEx | 有多个 result 是否抛出异常|
| T | entity | 实体对象|
| `Function<? super Object, V>` | mapper | 转换函数|

#### getById

```java
@Test
public  void testGetById(){
    User user = userService.getById(5);
    if (user != null) {
        System.out.println("User found: " + user);
    } else {
        System.out.println("User not found.");
    }
}
```

结果：

```txt
==>  Preparing: SELECT id,name,age,email FROM user WHERE id=?
==> Parameters: 5(Integer)
<==    Columns: id, name, age, email
<==        Row: 5, Billie, 24, test5@baomidou.com
<==      Total: 1
```

#### getOne(queryWrapper)

```java
@Test
public void testQueryWrapper(){
    LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(User::getName,"Billie");

    User result = userService.getOne(queryWrapper);
    //... other code 
}
```

输出结果：

```text
==>  Preparing: SELECT id,name,age,email FROM user WHERE (name = ?)
==> Parameters: Billie(String)
<==    Columns: id, name, age, email
<==        Row: 5, Billie, 24, test5@baomidou.com
<==      Total: 1
```

#### getOne 不抛出异常

```java
@Test
public void testQueryWrapper(){
    //...
    User user = userService.getOne(queryWrapper,false);
    //...
}
```

#### getObj?

```java
@Test
public void testGetObj(){
    // 假设有一个 QueryWrapper 对象，设置查询条件为 name = 'John Doe'，并将结果转换为 String
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("name", "John Doe");
    String userName = userService.getObj(queryWrapper, obj -> ((User) obj).getName()); // obj 返回的只有 Long 类型,导致类型转换报错？？？
    if (userName != null) {
        System.out.println("User name found: " + userName);
    } else {
        System.out.println("User name not found.");
    }
}
```

### list

```java
// 查询所有
List<T> list();
// 查询列表
List<T> list(Wrapper<T> queryWrapper);
// 查询（根据ID 批量查询）
Collection<T> listByIds(Collection<? extends Serializable> idList);
// 查询（根据 columnMap 条件）
Collection<T> listByMap(Map<String, Object> columnMap);
// 查询所有列表
List<Map<String, Object>> listMaps();
// 查询列表
List<Map<String, Object>> listMaps(Wrapper<T> queryWrapper);
// 查询全部记录
List<Object> listObjs();
// 查询全部记录
<V> List<V> listObjs(Function<? super Object, V> mapper);
// 根据 Wrapper 条件，查询全部记录
List<Object> listObjs(Wrapper<T> queryWrapper);
// 根据 Wrapper 条件，查询全部记录
<V> List<V> listObjs(Wrapper<T> queryWrapper, Function<? super Object, V> mapper);
```

#### listMaps

```java
@Test
public void listMapsTest(){
    LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.gt(User::getAge,24);

    List<Map<String, Object>> maps = userService.listMaps(queryWrapper);
    maps.forEach(System.out::println);
}
```

输出：

```
==>  Preparing: SELECT id,name,age,email FROM user WHERE (age > ?)
==> Parameters: 24(Integer)
<==    Columns: id, name, age, email
<==        Row: 3, Tom, 28, test3@baomidou.com
<==      Total: 1

{name=Tom, id=3, age=28, email=test3@baomidou.com}
```

### page

> 分页查询符合条件的记录。\
> 因为插件优化，如果想要实现分页功能，要添加分页依赖 `mybatis-plus-jsqlparser`，[1](https://baomidou.com/plugins/pagination/);

```java
// 无条件分页查询
IPage<T> page(IPage<T> page);
// 条件分页查询
IPage<T> page(IPage<T> page, Wrapper<T> queryWrapper);
// 无条件分页查询
IPage<Map<String, Object>> pageMaps(IPage<T> page);
// 条件分页查询
IPage<Map<String, Object>> pageMaps(IPage<T> page, Wrapper<T> queryWrapper);
```

#### page

```java
@Test
public void pageTest(){
    Page<User> page = new Page<>(1, 5);
    IPage<User> userPage = userService.page(page);
    List<User> userList = userPage.getRecords();
    userList.forEach(System.out::println);
}
```