package com.xz.web.mapper.ext;

import com.xz.web.bo.everydayWords.X400Bo;
import org.apache.ibatis.annotations.Select;

public interface EverydayWordsMapperExt {

    @Select({
            "select constellation_id from weixin_user where open_id = #{0}"
    })
    Long selectConstellationIdByOpenId(String openId);

    @Select({
            "select id, prev_pic as prevPic, speech, publish_time as currentDate from ti_yan_list",
            " where (update_timestamp) <= now() and constellation_id = #{0} ORDER BY update_timestamp desc LIMIT 0 ,1"
    })
    X400Bo selectCurrentYanByConstellationId(Long constellationId);
}
