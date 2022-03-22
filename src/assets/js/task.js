/*
 * @Description: 定期執行任務
 * @Autor: kindring
 * @Date: 2021-09-02 14:24:58
 * @LastEditors: kindring
 * @LastEditTime: 2021-09-02 17:55:19
 * @LastDescript: 
 */
// 定义任务队列
class Task {
    constructor() {
            this.taskList = new Object(null)
            this.taskId = 1
            this.preSigns = new Object(null)
        }
        // 添加任务
    add(fn, option) {
        // let baseTaskData = {
        //     // 需要完成的前置变量条件
        //     pres: [],
        //     // 等待时间
        //     waitTime: 0,
        //     handel: ()=>{}
        // }

        // 先将任务添加到任务队列中去
        let id = this.taskId

        if (option) {
            if (option.pre) {
                if (typeof option.pre == 'string') { option.pre = [option.pre] }
                option.pre.forEach(val => {
                    if (this.preSigns[val]) {
                        this.preSigns[val].tasks.push(id)
                    } else {
                        this.preSigns[val] = {
                            val: false,
                            tasks: [id]
                        }
                    }
                })
            }
        }
        this.taskList[id] = {
            fn: fn,
            option: option
        }
        this.taskId++;
        // 尝试运行任务,
        this.runTask(id)
        return this;
    }
    change(preSign) {
        let preData = this.preSigns[preSign];
        if (preData) {
            preData.val = true
                // 尝试找出任务有问题的
            this.checkPre(preData);
        }
        return this;
    }
    recover(preSign) {
        let preData = this.preSigns[preSign];
        if (preData) {
            preData.val = false
        }
        return this;
    }
    checkPre(preData) {
            preData.tasks.forEach(id => {
                if (this.taskList[id]) {
                    this.runTask(id)
                }
            })
            return this;
        }
        // 直接运行,嘗試直接執行任務
    run() {

            return this;
        }
        /**
         * 执行指定id的任务
         * @param {*} id 任务id
         * @returns 
         */
    runTask(id) {
        let task = this.taskList[id]
            // console.log(task);
        if (task) {
            try {
                if (task.option) {
                    let isPass = task.option.pre.every(pre => this.preSigns[pre].val)
                    if (isPass) {
                        task.fn()
                        this.removePre(task, id)
                            .removeTask(id)
                    }
                } else {
                    //执行任务
                    task.fn()
                    this.removePre(task, id)
                        .removeTask(id)
                }

            } catch (error) {
                this.errorHandel(error)
            }
        }
        return this;
    }
    chancelTask(id) {
        this.removePre(this.taskList[id], id)
            .removeTask(id)
    }
    removePre(task, id) {
        if (task.option && task.option.pre) {
            task.option.pre.forEach(pre => {
                this.preSigns[pre].tasks = this.preSigns[pre].tasks.filter(taskId => id != taskId)
            })
        }
        // 
        return this
    }
    removeTask(id) {
        delete this.taskList[id]
        return this
    }
    errorHandel(err) {
        console.error('出現錯誤')
        console.error(err)
        return this
    }
}

export default Task;