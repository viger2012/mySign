package com.xz.web.mapper;

import com.xz.web.entity.TiQianList;
import com.xz.web.entity.TiQianListExample;
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

public interface TiQianListMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_qian_list
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @SelectProvider(type=TiQianListSqlProvider.class, method="countByExample")
    int countByExample(TiQianListExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_qian_list
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @DeleteProvider(type=TiQianListSqlProvider.class, method="deleteByExample")
    int deleteByExample(TiQianListExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_qian_list
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Delete({
        "delete from ti_qian_list",
        "where id = #{id,jdbcType=BIGINT}"
    })
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_qian_list
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Insert({
        "insert into ti_qian_list (name, content, ",
        "create_timestamp, update_timestamp)",
        "values (#{name,jdbcType=VARCHAR}, #{content,jdbcType=VARCHAR}, ",
        "#{createTimestamp,jdbcType=VARCHAR}, #{updateTimestamp,jdbcType=VARCHAR})"
    })
    @Options(useGeneratedKeys=true,keyProperty="id")
    int insert(TiQianList record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_qian_list
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @InsertProvider(type=TiQianListSqlProvider.class, method="insertSelective")
    @Options(useGeneratedKeys=true,keyProperty="id")
    int insertSelective(TiQianList record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_qian_list
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @SelectProvider(type=TiQianListSqlProvider.class, method="selectByExample")
    @ConstructorArgs({
        @Arg(column="id", javaType=Long.class, jdbcType=JdbcType.BIGINT, id=true),
        @Arg(column="name", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="content", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="create_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="update_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR)
    })
    List<TiQianList> selectByExample(TiQianListExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_qian_list
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Select({
        "select",
        "id, name, content, create_timestamp, update_timestamp",
        "from ti_qian_list",
        "where id = #{id,jdbcType=BIGINT}"
    })
    @ConstructorArgs({
        @Arg(column="id", javaType=Long.class, jdbcType=JdbcType.BIGINT, id=true),
        @Arg(column="name", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="content", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="create_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR),
        @Arg(column="update_timestamp", javaType=String.class, jdbcType=JdbcType.VARCHAR)
    })
    TiQianList selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_qian_list
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @UpdateProvider(type=TiQianListSqlProvider.class, method="updateByExampleSelective")
    int updateByExampleSelective(@Param("record") TiQianList record, @Param("example") TiQianListExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_qian_list
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @UpdateProvider(type=TiQianListSqlProvider.class, method="updateByExample")
    int updateByExample(@Param("record") TiQianList record, @Param("example") TiQianListExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_qian_list
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @UpdateProvider(type=TiQianListSqlProvider.class, method="updateByPrimaryKeySelective")
    int updateByPrimaryKeySelective(TiQianList record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table ti_qian_list
     *
     * @mbggenerated Sat May 12 18:36:05 CST 2018
     */
    @Update({
        "update ti_qian_list",
        "set name = #{name,jdbcType=VARCHAR},",
          "content = #{content,jdbcType=VARCHAR},",
          "create_timestamp = #{createTimestamp,jdbcType=VARCHAR},",
          "update_timestamp = #{updateTimestamp,jdbcType=VARCHAR}",
        "where id = #{id,jdbcType=BIGINT}"
    })
    int updateByPrimaryKey(TiQianList record);
}