import { useEffect, useState } from 'preact/hooks';
import { NOT_NEED_LIST } from '../../douban/const';

interface BlacklistItem {
  name: string;
  disabled: boolean;
}

const STORAGE_KEY = 'blacklist';

const Blacklist = ({ onRefreshList }) => {
  // 从 localStorage 获取初始数据
  const initialData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const [blacklist, setBlacklist] = useState<BlacklistItem[]>(initialData);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    if (initialData.length === 0) {
      setBlacklist(NOT_NEED_LIST.map(item => ({ name: item, disabled: false })))
    }
    onRefreshList(blacklist.filter(item => !item.disabled))
  }, [])

  // 实时存储输入框数据到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blacklist));
    onRefreshList(blacklist.filter(item => !item.disabled))
  }, [blacklist]);

  const handleAdd = () => {
    if (newEntry.trim() !== '') {
      const updatedList = [{ name: newEntry, disabled: true }, ...blacklist];
      setBlacklist(updatedList);
      setNewEntry('');
    }
  };

  const handleDelete = (index) => {
    const filteredList = blacklist.filter((item, idx) => idx !== index);
    setBlacklist(filteredList);
  };

  const handleToggleDisabled = (index) => {
    const updatedList = [...blacklist];
    updatedList[index].disabled = !updatedList[index].disabled;
    setBlacklist(updatedList);
  };

  const handleInputChange = (index, value) => {
    const updatedList = [...blacklist];
    updatedList[index].name = value;
    setBlacklist(updatedList);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">不感兴趣关键字</h1>
      <p>用于过滤不想看的作业，修改实时保存，刷新页面即可</p>
      <div className="flex items-center mb-6 mt-1">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="输入后点击添加生效"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button className="btn btn-primary ml-2" onClick={handleAdd}>
          ➕
        </button>
      </div>
      {blacklist.map((item, index) => (
        <div key={index} className="flex items-center justify-between mb-2">
          <span>{index + 1}.</span>
          <input
            type="text"
            value={item.name}
            placeholder="输入关键词"
            className="input input-bordered input-sm w-full max-w-xs mx-1"
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <div className="flex items-center">
            <input type="checkbox" className="toggle toggle-primary" checked={!item.disabled} onChange={() => handleToggleDisabled(index)} />
            <button className="btn btn-sm btn-error ml-2" onClick={() => handleDelete(index)}>
              ⌫
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blacklist;