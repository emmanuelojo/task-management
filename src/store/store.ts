import { computed, reactive } from "vue";

export interface Column{
  column: string
  colour?: string
  columnData: Task[]
}
export interface Task{
  id: number
  status: string
  title: string
  desc?: string
  subTasks: subTask[]
}

export interface subTask {
  id: number
  completed: boolean
  subTask: string
}

interface State {
  showSidebar: boolean;
  darkTheme:boolean;
  tasks: Task[]
}

const state = reactive<State>({
  showSidebar: true,
  darkTheme: true,
  tasks: [
    
            {
                id: 1,
                status: 'Todo',
                title: "Build UI for onboarding flow",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: false,
                        subTask: "Scaffolding"
                    },
                    {
                        id: 2,
                        completed: false,
                        subTask: "Install dependencies"
                    },
                    {
                        id: 3,
                        completed: false,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
            {
                id: 2,
                status: 'Todo',
                title: "Build UI for search",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: false,
                        subTask: "Input field"
                    },
                    {
                        id: 2,
                        completed: false,
                        subTask: "Implement logic"
                    },
                ]
            },
            {
                id: 3,
                status: 'Todo',
                title: "Build settings UI",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: false,
                        subTask: "Scaffolding"
                    },
                    {
                        id: 2,
                        completed: false,
                        subTask: "Install dependencies"
                    },
                    {
                        id: 3,
                        completed: false,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
      
            {
                id: 4,
                status: 'In Progress',
                title: "Design settings and search pages",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        id: 2,
                        completed: false,
                        subTask: "Install dependencies"
                    },
                    {
                        id: 3,
                        completed: false,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
            {
                id: 5,
                status: 'In Progress',
                title: "Add acount management endpoints",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Input field"
                    },
                    {
                        id: 2,
                        completed: true,
                        subTask: "Implement UI"
                    },
                    {
                        id: 3,
                        completed: false,
                        subTask: "Implement logic"
                    },
                ]
            },
            {
                id: 6,
                status: 'In Progress',
                title: "Design onboarding flow",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        id: 2,
                        completed: false,
                        subTask: "Install dependencies"
                    },
                    {
                        id: 3,
                        completed: false,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
            {
                id: 7,
                status: 'In Progress',
                title: "Add search endpoints",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        id: 2,
                        completed: false,
                        subTask: "Install dependencies"
                    },
                ]
            },
            {
                id: 8,
                status: 'In Progress',
                title: "Add authentication endpoints",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        id: 2,
                        completed: false,
                        subTask: "Install dependencies"
                    },
                ]
            },
            {
                id: 9,
                status: 'In Progress',
                title: "Research pricing points of various competitors and try different business models",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        id: 2,
                        completed: false,
                        subTask: "Install dependencies"
                    },
                    {
                        id: 3,
                        completed: false,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
  
            {
                id: 10,
                status: 'Completed',
                title: "Conduct 5 wireframe tests",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Scaffolding"
                    },
                ]
            },
            {
                id: 11,
                status: 'Completed',
                title: "Create wireframe protype",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Scaffolding"
                    },
                ]
            },
            {
                id: 12,
                status: 'Completed',
                title: "Review results of usability tests and iterate",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Input field"
                    },
                    {
                        id: 2,
                        completed: true,
                        subTask: "Implement logic"
                    },
                ]
            },
            {
                id: 13,
                status: 'Completed',
                title: "Create paper prototypes and conduct 10 usability tests with potential customers",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        id: 2,
                        completed: true,
                        subTask: "Scaffolding"
                    },
                ]
            },
            {
                id: 14,
                status: 'Completed',
                title: "Market discovery",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Scaffolding"
                    },
                ]
            },
            {
                id: 15,
                status: 'Completed',
                title: "Competitor analysis",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Scaffolding"
                    },
                    {
                        id: 2,
                        completed: true,
                        subTask: "Install dependencies"
                    },
                ]
            },
            {
                id: 16,
                status: 'Completed',
                title: "Research the market",
                desc: "",
                subTasks: [
                    {
                        id: 1,
                        completed: true,
                        subTask: "Install dependencies"
                    },
                    {
                        id: 2,
                        completed: true,
                        subTask: "Connect to strong WiFi"
                    },
                ]
            },
     
    // {
    //     column: "Review",
    //     colour: "#45bede",
    //     columnData: []
    // },
    // {
    //     column: "Approved",
    //     colour: "#45bede",
    //     columnData: []
    // },
]
});

const mutations = {
  setSidebar(payload: boolean) {
    state.showSidebar = !state.showSidebar;
  },
  setTheme(payload: boolean){
    state.darkTheme = !state.darkTheme
  },
  appendTask(payload: any){},

//   appendColumn(payload: any){
//     state.tasks.find((ele) => {
//       if(ele.column === payload.column){
//         ele.columnData.push(payload.columnData)
//       }
//     })
//   }

  appendColumn(payload: any){
    state.tasks.push(payload)
  }
};

const actions = {
  getSidebarStatus() {
    return state.showSidebar;
  },

  addTask(data:any) {
    let appendedData = {id: state.tasks.length + 1,...data}
    mutations.appendColumn(appendedData)
  }
};

const getters = {
  sidebarStatus: computed(() => state.showSidebar),
  darkTheme: computed(() => state.darkTheme),
  tasks: computed(() => state.tasks),
};

export default {
  getters,
  actions,
  mutations,
};