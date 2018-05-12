package com.xz.web.mapper;

import com.xz.web.entity.Access;
import com.xz.web.entity.AccessExample;
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

public interface AccessMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table access
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @SelectProvider(type=AccessSqlProvider.class, method="countByExample")
    int countByExample(AccessExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table access
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @DeleteProvider(type=AccessSqlProvider.class, method="deleteByExample")
    int deleteByExample(AccessExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table access
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Delete({
        "delete from access",
        "where id = #{id,jdbcType=BIGINT}"
    })
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table access
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Insert({
        "insert into access (resource_id, resource_name, ",
        "resource_code, status, ",
        "userid, username, ",
        "add_flag, del_flag, upd_flag, ",
        "view_flag, create_timestamp, ",
        "update_timestamp)",
        "values (#{resourceId,jdbcType=INTEGER}, #{resourceName,jdbcType=VARCHAR}, ",
        "#{resourceCode,jdbcType=VARCHAR}, #{status,jdbcType=INTEGER}, ",
        "#{userid,jdbcType=INTEGER}, #{username,jdbcType=VARCHAR}, ",
        "#{addFlag,jdbcType=BIT}, #{delFlag,jdbcType=BIT}, #{updFlag,jdbcType=BIT}, ",
        "#{viewFlag,jdbcType=BIT}, #{createTimestamp,jdbcType=VARCHAR}, ",
        "#{updateTimestamp,jdbcType=VARCHAR})"
    })
    @Options(useGeneratedKeys=true,keyProperty="id")
    int insert(Access record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table access
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @InsertProvider(type=AccessSqlProvider.class, method="insertSelective")
    @Options(useGeneratedKeys=true,keyProperty="id")
    int insertSelective(Access record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table access
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @SelectProvider(type=AccessSqlProvider.class, method="selectByExample")
    @ConstructorArgs({
        @Arg(column="id", javaType=Long.class, jdbcType=JdbcType.BIGINT, id=true),
        @Arg(column="resource_id", javaType=Integer.class, jdbcType=JdbcType.INTEGER),
        @Arg(column="resource_name", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="resource_code", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="status", javaType=Integer.class, jdbcType=JdbcType.INTEGER),
        @Arg(column="userid", javaType=Integer.class, jdbcType=JdbcType.INTEGER),
        @Arg(column="username", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="add_flag", javaType=Boolean.class, jdbcType=JdbcType.BIT),
        @Arg(column="del_flag", javaType=Boolean.class, jdbcType=JdbcType.BIT),
        @Arg(column="upd_flag", javaType=Boolean.class, jdbcType=JdbcType.BIT),
        @Arg(column="view_flag", javaType=Boolean.class, jdbcType=JdbcType.BIT),
        @Arg(column="create_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="update_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR)
    })
    List<Access> selectByExample(AccessExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table access
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Select({
        "select",
        "id, resource_id, resource_name, resource_code, status, userid, username, add_flag, ",
        "del_flag, upd_flag, view_flag, create_timestamp, update_timestamp",
        "from access",
        "where id = #{id,jdbcType=BIGINT}"
    })
    @ConstructorArgs({
        @Arg(column="id", javaType=Long.class, jdbcType=JdbcType.BIGINT, id=true),
        @Arg(column="resource_id", javaType=Integer.class, jdbcType=JdbcType.INTEGER),
        @Arg(column="resource_name", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="resource_code", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="status", javaType=Integer.class, jdbcType=JdbcType.INTEGER),
        @Arg(column="userid", javaType=Integer.class, jdbcType=JdbcType.INTEGER),
        @Arg(column="username", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="add_flag", javaType=Boolean.class, jdbcType=JdbcType.BIT),
        @Arg(column="del_flag", javaType=Boolean.class, jdbcType=JdbcType.BIT),
        @Arg(column="upd_flag", javaType=Boolean.class, jdbcType=JdbcType.BIT),
        @Arg(column="view_flag", javaType=Boolean.class, jdbcType=JdbcType.BIT),
        @Arg(column="create_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="update_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR)
    })
    Access selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table access
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @UpdateProvider(type=AccessSqlProvider.class, method="updateByExampleSelective")
    int updateByExampleSelective(@Param("record") Access record, @Param("example") AccessExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table access
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @UpdateProvider(type=AccessSqlProvider.class, method="updateByExample")
    int updateByExample(@Param("record") Access record, @Param("example") AccessExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table access
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @UpdateProvider(type=AccessSqlProvider.class, method="updateByPrimaryKeySelective")
    int updateByPrimaryKeySelective(Access record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table access
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Update({
        "update access",
        "set resource_id = #{resourceId,jdbcType=INTEGER},",
          "resource_name = #{resourceName,jdbcType=VARCHAR},",
          "resource_code = #{resourceCode,jdbcType=VARCHAR},",
          "status = #{status,jdbcType=INTEGER},",
          "userid = #{userid,jdbcType=INTEGER},",
          "username = #{username,jdbcType=VARCHAR},",
          "add_flag = #{addFlag,jdbcType=BIT},",
          "del_flag = #{delFlag,jdbcType=BIT},",
          "upd_flag = #{updFlag,jdbcType=BIT},",
          "view_flag = #{viewFlag,jdbcType=BIT},",
          "create_timestamp = #{createTimestamp,jdbcType=VARCHAR},",
          "update_timestamp = #{updateTimestamp,jdbcType=VARCHAR}",
        "where id = #{id,jdbcType=BIGINT}"
    })
    int updateByPrimaryKey(Access record);
}