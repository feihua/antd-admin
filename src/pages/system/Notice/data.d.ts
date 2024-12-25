
export interface NoticeListParam {
  current: number;
  pageSize?: number;
  notice_title?: string; //公告标题
  notice_type?: number; //公告类型（1:通知,2:公告）
  notice_content?: string; //公告内容
  status?: number; //公告状态（0:关闭,1:正常 ）

}

export interface NoticeVo {
  id: number; //公告ID
  notice_title: string; //公告标题
  notice_type: number; //公告类型（1:通知,2:公告）
  notice_content: string; //公告内容
  status: number; //公告状态（0:关闭,1:正常 ）
  remark: string; //备注
  create_time: string; //创建时间
  update_time: string; //修改时间

}
