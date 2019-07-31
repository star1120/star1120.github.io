export default {
    addHerb: '/Zy/addHerb', // 添加中药
    getHerb: '/Zy/getHerb', // 查询中药
    delHerb: '/Zy/delHerb', // 删除中药
    saveHerb: '/Zy/saveHerb', // 修改中药
    savePreion: '/Zy/savePreion', // 新增或保存协定方
    getPreionList: '/Zy/getPreionList', // 获取协定方
    getCaseByPatient: '/Zy/getCaseByPatient', // 6、获取某一个病人的所有病例

    delPatient: '/Zy/delPatient', // 删除病患  -- 


    addClass: '/Zy/addClass', // 添加分类
    delClass: '/Zy/delClass', // 删除分类
    saveClass: '/Zy/saveClass', // 修改分类信息
    getClassByTop: '/Zy/getClassByTop', // 获取所有分类
    savePreionByClass: '/Zy/savePreionByClass', // 根据疾病设置增减药材
    getPreionByClass: '/Zy/getPreionByClass', // 根据分类获取增删的处方
    saveCase: '/Zy/saveCase', // 保存一个病人的病例
    delCase: '/Zy/delCase', // 删除病例

    docDelPreion: '/Zy/docDelPreion', //删除协议方

    addAdminUser:'/Zy/addAdminUser', // 新增管理员
    // editAdminUser:'/Zy/editAdminUser', // 编辑管理员
    delAdminUser:'/Zy/delAdminUser', // 删除管理员
    adminUserList:'/Zy/allDocList', // 管理员列表

    uploadFile:'/Zy/uploadFile', // 上传图片

    docLogin:'/Zy/docLogin', // 登录接口
    
    getTopClass:'/Zy/getTopClass', // 顶级分类


    //医生系统
    
        allPatientList: '/Zy/patientList', // 管理员查询患者列表
        // 看病记录
        docGetList:'/Zy/docGetList', // 医生查询自己的看病记录

        // 未开方列表
        docGetCase:'/Zy/docOrderList', // 医生获取可接单列表 
        // docGetCase:'/Zy/docGetCase', // 医生获取可接单列表 （患者远程已支付过诊费的且未开方的）
        docGetCaseById:'/Zy/docGetCaseById', // 医生获取可接单列表 （患者远程已支付过诊费的且未开方的）
        docSaveCase:'/Zy/docSaveCase', // 医生针对患者的主诉
        docChangeCase:'/Zy/docChangeCase', // 医生遇到的病人转给别的医生进行看病开方

        docSaveCaseNew: '/Zy/docSaveCaseNew',

        // 我的患者
        patientList: '/Zy/patientList', // 医生获取自己的病人列表
        getPatientInfo: '/Zy/getPatientInfo', // 获取患者信息
        savePatientInfo: '/Zy/savePatientInfo', // 修改病患信息
        // onePatientList: '/Zy/onePatientList', // 医生查看某一个患者的就诊记录（该患者在此医生下的所有看病记录）
        onePatientList: '/Zy/getOrderByOpenid', // 医生查看某一个患者的就诊记录（该患者在此医生下的所有看病记录）


        // 完善医生信息
        editAdminUser: '/Zy/editAdminUser', // 医生完善信息
        getDocInfo: '/Zy/getDocInfo', // 获取医生详细信息



        // 面对面看病
        addPatient: '/Zy/addPatient', // 添加病患  --





    //患者系统
    patientReg: '/Zy/patientReg', // 患者注册
    patientLogin: '/Zy/patientLogin', // 患者登陆接口
    patientGetCase: '/Zy/patientGetCase', // 患者获取自己的看病记录 包括付款的和未付款的
    patientGetCaseById: '/Zy/patientGetCaseById', // 患者或医生根据病例ID获取病例详情
    getOrderDetail: '/Zy/getOrderDetail', // 患者或医生根据病例ID获取病例详情
    patientSaveCase: '/Zy/patientSaveCase', // 患者填写主诉


    //  管理员系统
    // allPatientList: '/Zy/allPatientList', // 管理员查询患者列表
    manageGetUser: '/Zy/manageGetUser', // 管理员查询患者列表
    allCase: '/Zy/allCase', // 管理员获取所有的病例列表
    manageOrderList: '/Zy/manageOrderList'




}