<template>
<div>
1234
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
  <el-row :gutter="20"> 
  <el-col :span='8'>
  <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear='getUserList'>
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  </el-col>
  <el-col :span='4'> 
  <el-button type="primary"> 
  添加用户
  </el-button>
  </el-col>
  </el-row>
  <el-table :data='userist' border stripe>
  <el-table-column type="index"></el-table-column>
  <el-table-column label="姓名" prop="username"></el-table-column>
  <el-table-column label="邮箱" prop="email"></el-table-column>
  <el-table-column label="电话" prop="mobile"></el-table-column>
  <el-table-column label="角色" prop="role_name"></el-table-column>
  <el-table-column label="状态">
  <template slot-scope="scope">
  <el-switch v-model="scope.row.mg_state" @change="userStatusChanged(scope.row)">
  </el-switch>
  </template>
  </el-table-column>
  <el-table-column label="操作" width="180px">
  
   <template slot-scope="">
    <el-button type="primary" icon="el-icon-edit" size="min"></el-button>
    <el-button type="danger" icon="el-icon-delete" size="min"></el-button>
    <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable='false'>
      <el-button type="warning" icon="el-icon-setting" size="min"></el-button>
    </el-tooltip>
    
   </template>
  </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryTnfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.pagesize"
      layout="total,sizes, prev, pager, next,jumper"
      :total="total">
  </el-pagination>
</el-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表参数对象
      queryTnfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize:2
      },
      userlist: [],
      total:0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
   async getUserList() {
    const {data:res} = await this.$http.get('users',{params:queryTnfo})
    if(res.meta.status !== 200) {
      return this.$message.error('获取用户列表失败!');
    }
    this.userlist = res.data.users
    this.total = res.data.total
    },
    // 监听pagesize 改变的事件
    handleSizeChange(newSize) {
     this.queryTnfo.pagesize = newSize
     this.getUserList()
    },
    // 监听页码值改变事件
    handleCurrentChange(newPage) {
      this.queryTnfo.pagenum = newPage
      this.getUserList()
    },
    async userStatusChanged(userInfo) {
    const {data:res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
    if(res.meta.status !== 200) {
      userInfo.mg_state = !userInfo.mg_state
      return this.$message.error('更新用户状态失败')
    }
    this.$message.success('更新用户成功')
    }
  },
    
}
</script>



<style lang="less" scoped>

</style>