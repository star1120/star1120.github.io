const index = r => require.ensure([], () => r(require('../page/index/index')), 'index'); // 首页
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login'); // 登录
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home'); // home页

const prescription = r => require.ensure([], () => r(require('../page/prescription/prescription')), 'prescription') // 处方
const prescription_doc = r => require.ensure([], () => r(require('../page/prescription/prescription_doc')), 'prescription_doc') // 处方
const myPatient = r => require.ensure([], () => r(require('../page/myPatient/myPatient')), 'myPatient') // 我的患者
const allPatient = r => require.ensure([], () => r(require('../page/allPatient/allPatient')), 'allPatient') // 我的患者
const adminMana = r => require.ensure([], () => r(require('../page/adminMana/adminMana')), 'adminMana') // 管理员管理
const docMedicalRecord = r => require.ensure([], () => r(require('../page/docMedicalRecord/docMedicalRecord')), 'docMedicalRecord') // 看病记录
const patientMedicalRecord = r => require.ensure([], () => r(require('../page/patientMedicalRecord/patientMedicalRecord')), 'patientMedicalRecord') // 看病记录
const patientBingliRecord = r => require.ensure([], () => r(require('../page/bingliList/bingliList')), 'patientBingliRecord') // 看病记录
const unprescribed = r => require.ensure([], () => r(require('../page/unprescribed/unprescribed')), 'unprescribed') // 未开方列表
const prescribed = r => require.ensure([], () => r(require('../page/prescribed/prescribed')), 'prescribed') // 未开方列表
const various = r => require.ensure([], () => r(require('../page/various/various')), 'various') // 各论列表
const medicine = r => require.ensure([], () => r(require('../page/medicine/medicine')), 'medicine') // 中药列表


const demo = r => require.ensure([], () => r(require('../page/demo/demo')), 'demo') // 未开方列表


export default [
    //首页
    {
        path: '/index',
        component: index,
        children: [

            //登录后首页
            {
                path: '/',
                component: home
            },

            // 我的患者
            {
                path: '/myPatient',
                component: myPatient
            },

            // 所有患者
            {
                path: '/allPatient',
                component: allPatient
            },

            // 管理员管理
            {
                path: '/adminMana',
                component: adminMana
            },

            // 医生看病记录
            {
                path: '/docMedicalRecord',
                component: docMedicalRecord
            },
            // 患者看病记录
            {
                path: '/patientMedicalRecord',
                component: patientMedicalRecord
            },

            // 患者看病记录
            {
                path: '/patientBingliRecord',
                component: patientBingliRecord
            },

            // 未开方列表
            {
                path: '/unprescribed',
                component: unprescribed
            },

             // 开方列表
             {
                path: '/prescribed',
                component: prescribed
            },

            // 处方
            {
                path: '/prescription',
                component: prescription
            },

            // 公共处方
            {
                path: '/prescription_doc',
                component: prescription_doc
            },

            // 各论
            {
                path: '/various',
                component: various
            },

            // 中药列表
            {
                path: '/medicine',
                component: medicine
            },

        ]
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: login
    },

    //登录
    {
        path: '/',
        redirect: '/login/:name'
    },

    //登录
    {
        path: '/login/:name',
        component: login
    },

    {
        path: '/demo',
        component: demo
    },

]


