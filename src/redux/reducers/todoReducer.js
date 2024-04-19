import { createSlice } from "@reduxjs/toolkit";
import { addTodoAPI, deleteTodoApi, updateTodoApi,toggleTodoApi } from "../actions/todoAction";
//1. khai báo khởi tạo state
const initialState = {
   listTodo: [] // chứa danh sách công việc
}
//2. thiết lập cho reducer và định nghĩa các action
const todoSlice = createSlice({
   name: 'todos',
   initialState,
   reducers: {
     // làm việc với store cục bộ
       addTodo(state, action) {
         state.listTodo.push(action.payload);
     },
   },
   extraReducers: builder => {
       // sau khi gọi api ở action xong trong này mới hoạt động
       builder.addCase(deleteTodoApi.fulfilled, (state, action) => {
        // Xóa todo
         state.listTodo = state.listTodo.filter(row => row.id !== action.payload);
        
    }) .addCase(deleteTodoApi.rejected, (state, action) => {
        // Xử lý khi yêu cầu xóa todo bị từ chối hoặc xảy ra lỗi
        console.log('Delete todo rejected:', action.error.message);
    });

    builder.addCase(addTodoAPI.fulfilled, (state, action)=>{
        state.listTodo.push(action.payload);
    })
   .addCase(addTodoAPI.rejected, (state, action) => {
      // Xử lý khi yêu cầu thêm todo bị từ chối hoặc xảy ra lỗi
      console.log('Add todo rejected:', action.error.message);
});

builder.addCase(updateTodoApi.fulfilled, (state, action)=>{
    // lấy tham số truyền vào
    // console.log(action);
    const { id, ma_sinh_vien_ph43396, ten_ph43396, gioi_tinh_ph43396, ngay_sinh_ph43396,hinhanh_ph43396, email_ph43396, so_dien_thoai_ph43396 } = action.payload;
    // tìm bản ghi phù hợp với tham số truyền vào
    const todos = state.listTodo.find(row => row.id === id);
    // update
    if (todos ) {
        todos.ma_sinh_vien_ph43396 = ma_sinh_vien_ph43396; // gán giá trị
        todos.ten_ph43396 = ten_ph43396;
        todos.gioi_tinh_ph43396= gioi_tinh_ph43396;
        todos.ngay_sinh_ph43396 = ngay_sinh_ph43396;
        todos.email_ph43396 = email_ph43396;
        todos.hinhanh_ph43396 = hinhanh_ph43396;
        todos.so_dien_thoai_ph43396 = so_dien_thoai_ph43396;
    }
})
.addCase(updateTodoApi.rejected, (state, action) => {
    // Xử lý khi yêu cầu Sửa todo bị từ chối hoặc xảy ra lỗi
    console.log('Update todo rejected:', action.error.message);
});

    },

    
})
// export các thành phần để bên screen có thể sử dụng
export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;