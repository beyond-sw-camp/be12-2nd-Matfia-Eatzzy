import { defineStore } from "pinia";
import axios from "axios";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    data: [],
  }),
  actions: {
    async getStoreListAll() {
      try {
        const response = await axios.get("/api/app/admin/store/list");
        return response.data;
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        return null;
      }
    },
    async getStoreDetail(id) {
      const response = await axios
        .get(`/api/app/admin/store/${id}`)
        .catch((error) => {
          console.error("API 요청 중 오류 발생", error);
        });
      return response.data;
    },
    async getCategoryListAll() {
      try {
        const response = await axios.get("/api/app/category/list");
        return response.data;
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        return null;
      }
    },
    async updateCategoryName(categoryIdx, categoryName) {
      try {
        const response = await axios.patch(
          `/api/app/admin/category/${categoryIdx}`,
          { name: categoryName },
          {
            withCredentials: true,
          }
        );
    
        if (response.status === 200) {
          alert("카테고리명이 수정되었습니다.");
        }
        return response;
      } catch (error) {
        alert(error.response?.data?.message || "카테고리명 수정 중 오류가 발생했습니다.");
      }
    },
    async deleteCategory(categoryIdx) {
      try {
        const response = await axios.delete(
          `/api/app/admin/category/${categoryIdx}`,
          {
            withCredentials: true,
          }
        );
    
        if (response.status === 200) {
          alert("카테고리가 삭제 되었습니다.");
        }
        return response;
      } catch (error) {
        alert(error.response?.data?.message || "카테고리명 삭제 중 오류가 발생했습니다.");
      }
    },
    async updateStoreStatus(storeIdx, category, allow) {
      try {
        const response = await axios.patch(`/api/app/admin/store/${storeIdx}`,
          {
            categoryIdx: category,
            allowed: allow
          },
          {
            withCredentials: true,
          }
        );
    
        if (response.status === 200) {
          alert("수정되었습니다.");
        }
        return response;
      } catch (error) {
        alert(error.response?.data?.message || "수정 중 오류가 발생했습니다.");
      }
    },
    async createCategory(categoryIdx, categoryName) {
      try {
        const response = await axios.post(
          `/api/app/admin/category/create`,
          {
            name: categoryName,
            parentIdx: categoryIdx
          },
          {
            withCredentials: true,
          }
        );
    
        if (response.status === 200) {
          alert("카테고리가 추가 되었습니다.");
        }
        return response;
      } catch (error) {
        alert(error.response?.data?.message || "카테고리 추가 중 오류가 발생했습니다.");
      }
    },
  },  
});
