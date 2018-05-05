package com.yeting.web.service;

import com.github.pagehelper.PageInfo;
import com.yeting.framework.common.base.BaseService;
import com.yeting.web.bo.f20.F70Bo;
import com.yeting.web.bo.f30.F40Bo;
import com.yeting.web.mapper.entity.Comment;

public interface CommentService extends BaseService<Comment> {

    Integer updateCommentLike(String commentId);

    PageInfo<F70Bo> selectCommentListByArtId(Long artId, String startPage, Integer pageSize);

    Integer updateCommentUnLike(String commentId);

    PageInfo<F40Bo> selectCommentListByOpenId(PageInfo<F40Bo> pager, String openId, Integer pageNum, Integer pageSize);
}
