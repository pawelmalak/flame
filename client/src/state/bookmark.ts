import axios from 'axios';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  ApiResponse,
  Bookmark,
  Category,
  NewBookmark,
  NewCategory,
} from '../interfaces';
import { applyAuth, insertAt, sortData } from '../utility';
import { configAtom } from './config';
import { successMessage, useCreateNotification } from './notification';

export const bookmarksLoadingAtom = atom(true);
export const categoriesAtom = atom<Category[]>([]);
export const categoryInEditAtom = atom<Category | null>(null);
export const bookmarkInEditAtom = atom<Bookmark | null>(null);

export const useFetchCategories = () => {
  const setLoading = useSetAtom(bookmarksLoadingAtom);
  const setCategories = useSetAtom(categoriesAtom);

  return async () => {
    setLoading(true);

    try {
      const res = await axios.get<ApiResponse<Category[]>>('/api/categories', {
        headers: applyAuth(),
      });
      setCategories(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useAddCategory = () => {
  const createNotification = useCreateNotification();
  const categories = useAtomValue(categoriesAtom);
  const setSortedCategories = useSetSortedCategories();

  return async (formData: NewCategory) => {
    try {
      const res = await axios.post<ApiResponse<Category>>(
        '/api/categories',
        formData,
        { headers: applyAuth() }
      );
      createNotification(successMessage(`Category ${formData.name} created`));
      const category = res.data.data;

      const newCategories = [...categories, { ...category, bookmarks: [] }];
      setSortedCategories(newCategories);
    } catch (err) {
      console.log(err);
    }
  };
};

export const usePinCategory = () => {
  const createNotification = useCreateNotification();
  const [categories, setCategories] = useAtom(categoriesAtom);

  return async ({ id, isPinned, name }: Category) => {
    try {
      const res = await axios.put<ApiResponse<Category>>(
        `/api/categories/${id}`,
        { isPinned: !isPinned },
        { headers: applyAuth() }
      );

      const status = isPinned
        ? 'unpinned from Homescreen'
        : 'pinned to Homescreen';

      createNotification(successMessage(`Category ${name} ${status}`));

      const category = res.data.data;
      const categoryIdx = categories.findIndex(({ id }) => id === category.id);

      setCategories(
        insertAt(categories, categoryIdx, {
          ...category,
          bookmarks: [...categories[categoryIdx].bookmarks],
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const useDeleteCategory = () => {
  const createNotification = useCreateNotification();
  const setCategories = useSetAtom(categoriesAtom);

  return async (id: number) => {
    try {
      await axios.delete<ApiResponse<{}>>(`/api/categories/${id}`, {
        headers: applyAuth(),
      });

      createNotification(successMessage('Category deleted'));
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
};

export const useUpdateCategory = () => {
  const createNotification = useCreateNotification();
  const categories = useAtomValue(categoriesAtom);
  const setSortCategories = useSetSortedCategories();

  return async (id: number, formData: NewCategory) => {
    try {
      const res = await axios.put<ApiResponse<Category>>(
        `/api/categories/${id}`,
        formData,
        { headers: applyAuth() }
      );

      createNotification(successMessage(`Category ${formData.name} updated`));

      const category = res.data.data;

      const categoryIdx = categories.findIndex(({ id }) => id === category.id);
      const newCategories = insertAt(categories, categoryIdx, {
        ...category,
        bookmarks: [...categories[categoryIdx].bookmarks],
      });
      setSortCategories(newCategories);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useAddBookmark = () => {
  const createNotification = useCreateNotification();
  const setSortedBookmarks = useSetSortedBookmarks();
  const setCategoryInEdit = useSetAtom(categoryInEditAtom);
  const categories = useAtomValue(categoriesAtom);

  return async (formData: NewBookmark | FormData) => {
    try {
      const res = await axios.post<ApiResponse<Bookmark>>(
        '/api/bookmarks',
        formData,
        { headers: applyAuth() }
      );

      createNotification(successMessage(`Bookmark created`));

      const newBookmark = res.data.data;

      const categoryIdx = categories.findIndex(
        ({ id }) => id === newBookmark.categoryId
      );

      const targetCategory = {
        ...categories[categoryIdx],
        bookmarks: [...categories[categoryIdx].bookmarks, newBookmark],
      };

      const newCategories = insertAt(categories, categoryIdx, targetCategory);
      setSortedBookmarks(res.data.data.categoryId, newCategories);
      setCategoryInEdit(targetCategory);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useDeleteBookmark = () => {
  const createNotification = useCreateNotification();
  const categories = useAtomValue(categoriesAtom);
  const setSortedBookmarks = useSetSortedBookmarks();
  const setCategoryInEdit = useSetAtom(categoryInEditAtom);

  return async (bookmarkId: number, categoryId: number) => {
    try {
      await axios.delete<ApiResponse<{}>>(`/api/bookmarks/${bookmarkId}`, {
        headers: applyAuth(),
      });

      createNotification(successMessage('Bookmark deleted'));

      const categoryIdx = categories.findIndex(({ id }) => id === categoryId);
      const targetCategory = {
        ...categories[categoryIdx],
        bookmarks: categories[categoryIdx].bookmarks.filter(
          (bookmark) => bookmark.id !== bookmarkId
        ),
      };

      const newCategories = insertAt(categories, categoryIdx, targetCategory);
      setSortedBookmarks(categoryId, newCategories);
      setCategoryInEdit(targetCategory);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useUpdateBookmark = () => {
  const createNotification = useCreateNotification();
  const deleteBookmark = useDeleteBookmark();
  const addBookmark = useAddBookmark();
  const categories = useAtomValue(categoriesAtom);
  const setCategoryInEdit = useSetAtom(categoryInEditAtom);
  const setSortedBookmarks = useSetSortedBookmarks();

  return async (
    bookmarkId: number,
    formData: NewBookmark | FormData,
    category: {
      prev: number;
      curr: number;
    }
  ) => {
    try {
      const res = await axios.put<ApiResponse<Bookmark>>(
        `/api/bookmarks/${bookmarkId}`,
        formData,
        { headers: applyAuth() }
      );
      const newBookmark = res.data.data;

      createNotification(successMessage('Bookmark updated'));

      // Check if category was changed
      const categoryWasChanged = category.curr !== category.prev;

      if (categoryWasChanged) {
        // Delete bookmark from old category
        deleteBookmark(bookmarkId, category.prev);

        // Add bookmark to the new category
        addBookmark(newBookmark);
      } else {
        // Else replace in current category
        const categoryIdx = categories.findIndex(
          ({ id }) => id === newBookmark.categoryId
        );

        const prevBookmarks = categories[categoryIdx].bookmarks;

        const bookmarkIdx = prevBookmarks.findIndex(
          ({ id }) => id === newBookmark.id
        );

        const targetCategory = {
          ...categories[categoryIdx],
          bookmarks: insertAt(prevBookmarks, bookmarkIdx, newBookmark),
        };

        setCategoryInEdit(targetCategory);
        setSortedBookmarks(
          res.data.data.categoryId,
          insertAt(categories, categoryIdx, targetCategory)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const useSetSortedCategories = () => {
  const { useOrdering } = useAtomValue(configAtom);
  const setCategories = useSetAtom(categoriesAtom);
  const categories = useAtomValue(categoriesAtom);

  return (localCategories?: Category[]) => {
    setCategories(
      sortData<Category>(localCategories || categories, useOrdering)
    );
  };
};

export const useReorderCategories = () => {
  const setCategories = useSetAtom(categoriesAtom);

  return async (categories: Category[]) => {
    interface ReorderQuery {
      categories: {
        id: number;
        orderId: number;
      }[];
    }

    try {
      const updateQuery: ReorderQuery = { categories: [] };

      categories.forEach((category, index) =>
        updateQuery.categories.push({
          id: category.id,
          orderId: index + 1,
        })
      );

      await axios.put<ApiResponse<{}>>(
        '/api/categories/0/reorder',
        updateQuery,
        { headers: applyAuth() }
      );
      setCategories(categories);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useReorderBookmarks = () => {
  const [categories, setCategories] = useAtom(categoriesAtom);

  return async (bookmarks: Bookmark[], categoryId: number) => {
    interface ReorderQuery {
      bookmarks: {
        id: number;
        orderId: number;
      }[];
    }

    try {
      const updateQuery: ReorderQuery = { bookmarks: [] };

      bookmarks.forEach((bookmark, index) =>
        updateQuery.bookmarks.push({
          id: bookmark.id,
          orderId: index + 1,
        })
      );

      await axios.put<ApiResponse<{}>>(
        '/api/bookmarks/0/reorder',
        updateQuery,
        { headers: applyAuth() }
      );

      const categoryIdx = categories.findIndex(({ id }) => id === categoryId);
      const newCategories = insertAt(categories, categoryIdx, {
        ...categories[categoryIdx],
        bookmarks,
      });

      setCategories(newCategories);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useSetSortedBookmarks = () => {
  const { useOrdering } = useAtomValue(configAtom);
  const [categories, setCategories] = useAtom(categoriesAtom);

  return (categoryId: number, localCategories?: Category[]) => {
    const targetCategories = localCategories || categories;

    const categoryIdx = targetCategories.findIndex(
      ({ id }) => id === categoryId
    );

    const category = targetCategories[categoryIdx];
    const sortedBookmarks = sortData<Bookmark>(category.bookmarks, useOrdering);

    const newCategories = insertAt(targetCategories, categoryIdx, {
      ...category,
      bookmarks: sortedBookmarks,
    });

    setCategories(newCategories);
  };
};
