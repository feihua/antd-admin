export interface NoticeListParam {
    pageNo: number;
    pageSize?: number;
    noticeTitle?: string; //公告标题
    noticeType?: number; //公告类型（1:通知,2:公告）
    noticeContent?: string; //公告内容
    status?: number; //公告状态（0:关闭,1:正常 ）

}

export interface NoticeVo {
    id: number; //公告ID
    noticeTitle: string; //公告标题
    noticeType: number; //公告类型（1:通知,2:公告）
    noticeContent: string; //公告内容
    status: number; //公告状态（0:关闭,1:正常 ）
    remark: string; //备注
    createTime: string; //创建时间
    updateTime: string; //修改时间

}
