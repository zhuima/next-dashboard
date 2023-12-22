#!/bin/bash
###
 # @Author: zhuima zhuima314@gmail.com
 # @Date: 2023-12-20 15:06:54
 # @LastEditors: zhuima zhuima314@gmail.com
 # @LastEditTime: 2023-12-20 15:34:13
 # @FilePath: /my-next-dashboard/shell/other.sh
 # @Description: 
 # 第一列是项目语言language，第二列是描述description，第三列是项目名称project_name，第四列是git_repo, 第五列是port, 第六列是owner_id
 # Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
#  INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('nodejs', '宝尊前端项目', 'ms-baozun', 'git@gitlab.op.dajie-inc.com:meishiyi/frontend/ms-baozun.git', 'https://vip.meitums.com', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('nodejs', 'OMS-达人看板工具', 'wxd-meitu-vue', '<git@gitlab.op.dajie-inc.com>:ms-ued/wxd-meitu.git', 'https://wxd.meitums.cn', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('nodejs', '知识付费-课程体系H5', 'ms-fn-h5', 'git@gitlab.op.dajie-inc.com:ms-ued/ms-fn-h5.git', 'https://fn.meitums.cn', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('nodejs', '大数据本地团购管理系统前端', 'meishi-dylife-manage-frontend', 'git@gitlab.op.dajie-inc.com:account-center/meishi-dylife-manage.git', 'https://ms-dylive-manager.meitums.cn', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('html+css', '视听协会思政课-视频H5', 'cnsa-szk', 'git@gitlab.op.dajie-inc.com:ms-ued/h5-group/cnsa-szk.git', 'https://szk.meitums.cn', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('nodejs', '美事通精简版h5签约', 'mst-offer', 'git@gitlab.op.dajie-inc.com:ms-ued/mst-offer.git', 'https://offer.meishitong168.cn', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('nodejs', '美事通offer', 'mst-offer', 'http://gitlab.op.dajie-inc.com/ms-ued/mst-offer.git', 'https://offer.meishitong168.cn/login', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('nodejs', '大数据后台管理系统前端', 'ruoyi-ui', '目录', 'git@gitlab.op.dajie-inc.com:wei.kou/bigdata-manager-system.git', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('nodejs', '本地生活代运营管理后台', 'grouppurchasing-manage', 'git@gitlab.op.dajie-inc.com:ms-ued/grouppurchasing-manage.git', 'https://partner.meitums.cn/', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('nodejs', '本地生活招募报名H5', 'localliferecruit-h5', 'git@gitlab.op.dajie-inc.com:ms-ued/localliferecruit-h5.git', 'https://offer.meitums.cn', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('nodejs', 'crm邮件审批', 'ms-crm-ots', 'git@gitlab.op.dajie-inc.com:ms-ued/ms-crm-ots.git', 'https://crm-ots.meitums.cn', 'active');
# INSERT INTO projects (language, description, project_name, git_repo, domain, status) VALUES ('nodejs', '妙探-本地生活直播服务运营系统', 'ms-life-creator', 'git@gitlab.op.dajie-inc.com:ms-ued/web-group/ms-life-creator.git', 'https://lifecreator.meitums.cn/', 'active');
### 

# 数据库配置变量
DB_TABLE="projects"

# 数据文件路径
DATA_FILE="./other.txt"

status="active"
# 读取数据文件
while read -r language description project_name git_repo domain port owner_id
do
    # 构建 SQL 插入语句
    SQL="INSERT INTO $DB_TABLE (language, description, project_name, git_repo, domain, port, status) VALUES ('$language', '$description', '$project_name', '$git_repo', '$domain', '$port', '$status');"

    # 打印 SQL 语句（或者执行 SQL 语句）
    echo "$SQL"

done < "$DATA_FILE"
