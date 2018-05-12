package com.xz.web.mapper;

import com.xz.web.entity.TiAdmin;
import com.xz.web.entity.TiAdminExample;
import java.util.List;
import org.apache.ibatis.annotations.Arg;
import org.apache.ibatis.annotations.ConstructorArgs;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.InsertProvider;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.UpdateProvider;
import org.apache.ibatis.type.JdbcType;

public interface TiAdminMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_admin
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @SelectProvider(type=TiAdminSqlProvider.class, method="countByExample")
    int countByExample(TiAdminExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_admin
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @DeleteProvider(type=TiAdminSqlProvider.class, method="deleteByExample")
    int deleteByExample(TiAdminExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_admin
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Delete({
        "delete from ti_admin",
        "where id = #{id,jdbcType=BIGINT}"
    })
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_admin
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Insert({
        "insert into ti_admin (username, password, ",
        "status, create_timestamp, ",
        "update_timestamp)",
        "values (#{username,jdbcType=VARCHAR}, #{password,jdbcType=VARCHAR}, ",
        "#{status,jdbcType=INTEGER}, #{createTimestamp,jdbcType=VARCHAR}, ",
        "#{updateTimestamp,jdbcType=VARCHAR})"
    })
    @Options(useGeneratedKeys=true,keyProperty="id")
    int insert(TiAdmin record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_admin
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @InsertProvider(type=TiAdminSqlProvider.class, method="insertSelective")
    @Options(useGeneratedKeys=true,keyProperty="id")
    int insertSelective(TiAdmin record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_admin
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @SelectProvider(type=TiAdminSqlProvider.class, method="selectByExample")
    @ConstructorArgs({
        @Arg(column="id", javaType=Long.class, jdbcType=JdbcType.BIGINT, id=true),
        @Arg(column="username", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="password", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="status", javaType=Integer.class, jdbcType=JdbcType.INTEGER),
        @Arg(column="create_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="update_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR)
    })
    List<TiAdmin> selectByExample(TiAdminExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_admin
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Select({
        "select",
        "id, username, password, status, create_timestamp, update_timestamp",
        "from ti_admin",
        "where id = #{id,jdbcType=BIGINT}"
    })
    @ConstructorArgs({
        @Arg(column="id", javaType=Long.class, jdbcType=JdbcType.BIGINT, id=true),
        @Arg(column="username", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="password", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="status", javaType=Integer.class, jdbcType=JdbcType.INTEGER),
        @Arg(column="create_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="update_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR)
    })
    TiAdmin selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_admin
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @UpdateProvider(type=TiAdminSqlProvider.class, method="updateByExampleSelective")
    int updateByExampleSelective(@Param("record") TiAdmin record, @Param("example") TiAdminExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_admin
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @UpdateProvider(type=TiAdminSqlProvider.class, method="updateByExample")
    int updateByExample(@Param("record") TiAdmin record, @Param("example") TiAdminExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_admin
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @UpdateProvider(type=TiAdminSqlProvider.class, method="updateByPrimaryKeySelective")
    int updateByPrimaryKeySelective(TiAdmin record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_admin
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Update({
        "update ti_admin",
        "set username = #{username,jdbcType=VARCHAR},",
          "password = #{password,jdbcType=VARCHAR},",
          "status = #{status,jdbcType=INTEGER},",
          "create_timestamp = #{createTimestamp,jdbcType=VARCHAR},",
          "update_timestamp = #{updateTimestamp,jdbcType=VARCHAR}",
        "where id = #{id,jdbcType=BIGINT}"
    })
    int updateByPrimaryKey(TiAdmin record);
}