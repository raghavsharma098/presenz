import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchTranslations } from './store/languageSlice';

export default function AutoTranslate() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(state => state.language.selected);

  useEffect(() => {
    if (selected) {
      dispatch(fetchTranslations({ targetLanguage: selected }));
    }
  }, [selected, dispatch]);

  return null;
}
