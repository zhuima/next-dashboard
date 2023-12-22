#!/bin/bash
###
 # @Author: zhuima zhuima314@gmail.com
 # @Date: 2023-12-20 15:06:54
 # @LastEditors: zhuima zhuima314@gmail.com
 # @LastEditTime: 2023-12-20 15:29:49
 # @FilePath: /my-next-dashboard/shell/java.sh
 # @Description: 
 # 第一列是项目语言language，第二列是描述description，第三列是项目名称project_name，第四列是git_repo, 第五列是port, 第六列是owner_id
 # Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
#  INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '“”', 'ms-scrm-webapp', 'git@gitlab.op.dajie-inc.com:crm/scrm/ms-scrm.git', '9147', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '“”', 'scrm-service', 'git@gitlab.op.dajie-inc.com:crm/scrm/scrm-service.git', '9237', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('nodejs', '“”', 'ms-scrm-vue', 'git@gitlab.op.dajie-inc.com:ms-ued/ms-scrm.git', '80', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '新氧定制签约流程', 'dj-ms-esign-webapp', 'git@gitlab.op.dajie-inc.com:meishitong/webapp/dj-ms-esign-webapp.git', '9115', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '“”', 'centerplatform-topic-library', 'git@gitlab.op.dajie-inc.com/data-collection/centerplatform-topic-library.git', '9236', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '账号中心搜索服务', 'account-center-search', 'git@gitlab.op.dajie-inc.com:account-center/account-center-search.git', '9238', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '账号中心调度控制-位于账号中心和爬虫之间的策略控制层', 'meishi-data-center-dispatch-parent', 'git@gitlab.op.dajie-inc.com:account-center/meishi-data-center-dispatch-parent.git', '9239', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '宝尊项目、给合作商使用', 'meishi-business-ka-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-ka-service.git', '9240', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '对接外部采集渠道', 'meishi-dc-gather-service', 'git@gitlab.op.dajie-inc.com:account-center/meishi-dc-gather-service.git', '9241', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '支付组件-订服务', 'ms-pay-order', 'git@gitlab.op.dajie-inc.com:ms-pay/ms-pay-order.git', '9243', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '支付组件-任务调度服务', 'ms-pay-cron', 'git@gitlab.op.dajie-inc.com:ms-pay/ms-pay-cron.git', '9242', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '支付组件-帐户服务', 'ms-pay-account', 'git@gitlab.op.dajie-inc.com:ms-pay/ms-pay-account.git', '9244', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '支付组件-消息监听服务', 'ms-pay-listener', 'git@gitlab.op.dajie-inc.com:ms-pay/ms-pay-listener.git', '9245', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '支付组件-openapi服务', 'ms-pay-openapi', 'git@gitlab.op.dajie-inc.com:ms-pay/ms-pay-openapi.git', '9246', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '支付组件-对账服务', 'ms-pay-check', 'git@gitlab.op.dajie-inc.com:ms-pay/ms-pay-check.git', '9247', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '美事知道小程序对接服务', 'meishi-business-knowledge-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-knowledge-service.git', '9248', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '支付组件-通知服务', 'ms-pay-notice', 'git@gitlab.op.dajie-inc.com:ms-pay/ms-pay-notice.git', '9249', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '支付组件-配置服务', 'ms-pay-config', 'git@gitlab.op.dajie-inc.com:ms-pay/ms-pay-config.git', '9250', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '支付组件-业务监听服务', 'ms-pay-business-listener', 'git@gitlab.op.dajie-inc.com:ms-pay/ms-pay-business-listener.git', '9251', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '账号中心数仓API服务', 'bigdata-repository-api', 'git@gitlab.op.dajie-inc.com:account-center/bigdata-repository-api.git', '9252', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '美事视频管理中心', 'meishi-basic-material-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/basic-service/meishi-basic-material-parent.git', '9254', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', 'SCRM底层重构一期', 'meishi-basic-scrm-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/basic-service/meishi-basic-scrm-parent.git', '9255', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '大数据后台管理系统后端', 'ruoyi-admin', 'git@gitlab.op.dajie-inc.com:wei.kou/bigdata-manager-system.git', '9256', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '抖音生活服务', 'dj-ms-douyinlife', 'git@gitlab.op.dajie-inc.com:meishitong/webapp/dj-ms-douyinlife.git', '9258', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '知识付费新增服务', 'meishi-business-knowledge-fn-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-knowledge-fn-service.git', '9259', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '本地生活业务中台', 'meishi-business-locallife-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-locallife-service', '9260', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '代运营基础服务', 'meishi-basic-partner-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/basic-service/meishi-basic-partner-parent.git', '9264', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '代运营系统中台服务', 'meishi-business-partner-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-partner-service.git', '9265', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', 'SCRM中台项目', 'meishi-business-scrm-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-scrm-service.git', '9266', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '妙探-达人运营业务中台', 'meishi-business-koc-operation-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-koc-operation-service.git', '9268', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '邮件发送基础服务', 'ms-mail-basic-service', 'git@gitlab.op.dajie-inc.com:ms-sms/ms-mail-basic-service.git', '9229', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '邮件发送平台管理服务', 'ms-mail-admin-web', 'git@gitlab.op.dajie-inc.com:ms-sms/ms-mail-admin-web.git', '9230', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '网关服务', 'meishi-gateway', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/meishi-gateway.git', '9100', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '账号中台服务', 'meishi-business-account-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-account-service.git', '9101', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '系统设置(字典)', 'meishi-system-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/meishi-system-parent.git', '9102', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '客户基础服务不需要加入pipeline', 'meishi-basic-customer-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/basic-service/meishi-basic-customer-parent.git', '9103', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '美事框架核心项目不需要加入pipelin', 'meishi-framework-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/meishi-framework-parent.git', '9104', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '美事版本项目', 'meishi-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/meishi-parent.git', '9105', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '文件基础服务', 'meishi-file-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/meishi-file-parent.git', '9106', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '用户中台服务', 'meishi-business-user-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-user-parent.git', '9107', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '短信服务', 'meishi-message-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/meishi-message-parent.git', '9108', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '账号基础服务', 'meishi-basic-account', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/basic-service/meishi-basic-account.git', '9110', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '订中台服务', 'meishi-business-order-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-order-service.git', '9112', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '订基础服务', 'meishi-basic-order-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/basic-service/meishi-basic-order-parent.git', '9113', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '财务中台服务', 'meishi-business-finance-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-finance-service.git', '9114', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '财务基础服务', 'meishi-basic-finance-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/basic-service/meishi-basic-finance-parent.git', '9115', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '价格计算服务', 'meishi-business-price-prant', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-price-parent.git', '9116', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '账号中心服务', 'meishi-data-centre-account', 'git@gitlab.op.dajie-inc.com/meishiyi/backend/dc/meishi-data-centre-account.git', '9117', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '美事koc用户裂变服务', 'meishi-business-fission-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/meishi-business-fission-service.git', '9220', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '提供业务数据管理、binlog订阅、快照等服务、业务数据管理服务', 'meishi-data-management-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/meishi-data-management-parent.git', '9221', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '提供es通用服务', 'meishi-common-search-parent', 'git@gitlab.op.dajie-inc.com:meishiyi/search/meishi-common-search-parent.git', '9222', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '邀约功能-邀约平台', 'invitation', 'git@gitlab.op.dajie-inc.com:data-collection/invitation.git', '9223', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '邀约功能-AB实验平台项目', 'abexperiment', 'git@gitlab.op.dajie-inc.com:data-collection/abexperiment.git', '9224', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '邀约功能-召回平台', 'recall', 'git@gitlab.op.dajie-inc.com:data-collection/recall.git', '9225', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '商家端服务中台', 'meishi-business-merchant-service', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-merchant-service.git', '9226', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '美事平台网关部署', 'meishi-dataplatform', 'git@gitlab.op.dajie-inc.com:data-collection/dataplatform.git', '9231', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '创建美事数据平台[微信圈量回调服务]部署环境', 'dataplatformworkweixin', 'git@gitlab.op.dajie-inc.com:data-collection/dataplatformworkweixin.git', '9232', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '智能中台、搜索服务', 'centerplatform-search', 'git@gitlab.op.dajie-inc.com:data-collection/centerplatform-search.git', '9234', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', 'koc、订基础服务', 'meishi-basic-koc-order', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/basic-service/meishi-basic-koc-order.git', '9233', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, port, status) VALUES ('java', '美事多多运营管理后台中台服务', 'meishi-business-operation-admin', 'git@gitlab.op.dajie-inc.com:meishiyi/backend/business-service/meishi-business-operation-admin.git', '9235', 'active');
# ### 

# 数据库配置变量
DB_TABLE="projects"

# 数据文件路径
DATA_FILE="./java.txt"

status="active"
# 读取数据文件
while read -r language description project_name git_repo port owner_id
do
    # 构建 SQL 插入语句
    SQL="INSERT INTO $DB_TABLE (language, description, project_name, git_repo, port, status) VALUES ('$language', '$description', '$project_name', '$git_repo', '$port', '$status');"

    # 打印 SQL 语句（或者执行 SQL 语句）
    echo "$SQL"

done < "$DATA_FILE"
