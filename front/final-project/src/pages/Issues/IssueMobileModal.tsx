import styles from './IssueMobileModal.module.scss'
import CloseIcon from '../../assets/icons/Close';
import TextInputWithLabel from '../../components/InputText/InputTextWithLabel';
import TextAreaWithLabel from '../../components/InputText/TextAreaWithLabel';
import CategoriesIcon from '../../assets/icons/Categories';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import UploadIcon from '../../assets/icons/Upload';
import DeleteIcon from '../../assets/icons/Delete';
import CancelIcon from '../../assets/icons/Cancel';
import PlayIcon from '../../assets/icons/Play';
import truncateFileName from '../../utils/truncateFileName';
import getFileType from '../../utils/getFileType';
import { addFileId, createIssueStart, removeFileId, setCategoryForModal, setDescription, setLabelIdsForModal, setTitle } from '../../redux/slices/IssueModalSlice';
import { fetchTags } from '../../redux/slices/IssueModalSlice';
import { useNavigate } from 'react-router-dom';
interface IssueModalProps {
  handleCloseModal: () => void
}

const IssueMobileModal = ({ handleCloseModal }: IssueModalProps) => {
  const dispatch = useDispatch()
  const [title, setTitleState] = useState("")
  const [desc, setDescState] = useState("")
  const [category, setCategoryState] = useState<'Bug' | 'Suggestion'>('Bug')
  const [selectedLabels, setSelectedLabelsState] = useState<string[]>([])
  const isLoading = useSelector((state: any) => state.issueModal.Loading)
  const error = useSelector((state: any) => state.issueModal.error)
  const tags = useSelector((state: any) => state.issueModal.tags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);


  const handleTitleChange = (title: string) => {
    setTitleState(title)
    dispatch(setTitle(title))
  }
  const handleDescChange = (desc: string) => {
    setDescState(desc)
    dispatch(setDescription(desc))
  }
  const handleCategoryChange = (selectedCategory: 'Bug' | 'Suggestion') => {
    setCategoryState(selectedCategory)
    dispatch(setCategoryForModal(selectedCategory))
  }

  const handleLabelClick = (label: string) => {
    const updatedLabelIds = selectedLabels.includes(label)
      ? selectedLabels.filter(id => id !== label)
      : [...selectedLabels, label];
    setSelectedLabelsState(updatedLabelIds)
    dispatch(setLabelIdsForModal(updatedLabelIds))
  }

  const [files, setFiles] = useState<File[]>([]);
  console.log(files)
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string; size: string; url: string }[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<{ id: string; name: string; size: number; progress: number }[]>([]);
  const xhrRequests = useRef<{ [key: string]: XMLHttpRequest }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    uploadFiles(newFiles); // Start uploading immediately
    event.target.value = '';
  };

  // Function to handle file drag
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const newFiles = Array.from(event.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    uploadFiles(newFiles); // Start uploading immediately
  };
  // Function to handle file drag over
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const uploadFiles = (filesToUpload: File[]) => {
    filesToUpload.forEach(file => {
      const id = URL.createObjectURL(file);  // Generate a new object URL for each file
      setUploadingFiles(prev => [...prev, { id, name: file.name, size: file.size, progress: 0 }]);

      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('file', file);
      xhrRequests.current[id] = xhr;

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = event.loaded / event.total;
          setUploadingFiles(prev => prev.map(f =>
            f.id === id ? { ...f, progress } : f
          ));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 201) {
          const response = JSON.parse(xhr.responseText);  // Parse the response to get the file ID
          const fileId = response.id;  // Assuming the server returns an object with an "id" field
          const fileUrl = `/api/files/${fileId}`;  // Construct the file URL

          // Update the uploadedFiles state with the new URL
          setUploadedFiles(prev => [...prev, { id: fileId, name: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)}MB`, url: fileUrl }]);
          setUploadingFiles(prev => prev.filter(f => f.id !== id));

          // Revoke the temporary object URL after updating the state
          URL.revokeObjectURL(id);
          dispatch(addFileId(fileId))
        } else {
          console.error('Upload failed:', xhr.statusText);
        }
      };

      xhr.onerror = () => {
        console.error('Upload failed:', xhr.statusText);
      };

      xhr.open('POST', '/api/files/upload', true);
      xhr.send(formData);
    });

    setFiles([]);
  };


  // Function to handle file deletion
  const handleDelete = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    URL.revokeObjectURL(id);  // Release the object URL
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    dispatch(removeFileId(id))
  };

  // Function to handle file cancellation
  const handleCancel = (id: string) => {
    if (xhrRequests.current[id]) {
      xhrRequests.current[id].abort();
      delete xhrRequests.current[id];
    }
    setUploadingFiles(prev => prev.filter(file => file.id !== id));
    URL.revokeObjectURL(id);  // Release the object URL
  };

  const handlePlay = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  const renderFilePreview = (file: { id: string; name: string; url: string }) => {
    const fileType = getFileType(file.name);
    switch (fileType) {
      case 'image':
        return <img src={file.url} alt={truncateFileName(file.name)} onClick={() => handlePlay(file.url)} />;
      case 'video':
        return (
          <>
            <video src={file.url} controls={false} />
            <div className={styles.play} onClick={() => handlePlay(file.url)}>
              <PlayIcon height={40} width={40} fill='var(--modal-play-icon)' />
            </div>
          </>
        );
      case 'pdf':
        return <div className={styles.pdfIcon} onClick={() => handlePlay(file.url)}>PDF</div>;  // Add a custom PDF icon if you have one
      default:
        return <div className={styles.fileIcon} onClick={() => handlePlay(file.url)}>FILE</div>;  // Add a custom generic file icon
    }
  };

  const navigate = useNavigate()


  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <div onClick={handleCloseModal} className={styles.closeIcon}>
          <CloseIcon height={24} width={24} fill='var(--issue-modal-close-icon)' />
        </div>
        <span className={styles.modalTitle}>ارسال بازخورد</span>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.title}>
          <TextInputWithLabel
            label='عنوان'
            placeholder='...عنوان بازخورد را وارد کنید'
            inputClassName={styles.titleInput}
            labelClassName={styles.customLabel}
            wrapperClassName={styles.inputWrapper}
            value={title}
            onChange={(e: any) => handleTitleChange(e.target.value)}
          />
        </div>
        <div className={styles.desc}>
          <TextAreaWithLabel
            label='توضیحات'
            placeholder='...توضیحات بازخورد را وارد کنید'
            inputClassName={styles.descInput}
            labelClassName={styles.customLabel}
            wrapperClassName={styles.inputWrapper}
            value={desc}
            onChange={(e: any) => handleDescChange(e.target.value)}
          />
        </div>
        <div className={styles.category}>
          <div className={styles.categoryTitle}>
            <CategoriesIcon width={24} height={24} fill='var(--issue-modal-category-icon)' />
            <span className={styles.categoryTitleText}>:دسته بندی</span>
          </div>
          <div className={styles.categoryInput}>
            <div className={styles.suggestDiv}>
              <label htmlFor='suggest'>پیشنهاد</label>
              <input
                name='category'
                id='suggest'
                type='radio'
                className={styles.suggest}
                checked={category === 'Suggestion'}
                onChange={() => handleCategoryChange('Suggestion')}
              />
            </div>
            <div className={styles.reportDiv}>
              <label htmlFor='report'>گزارش اشکال</label>
              <input
                name='category'
                id='report'
                type='radio'
                className={styles.report}
                checked={category === 'Bug'}
                onChange={() => handleCategoryChange('Bug')}
              />
            </div>
          </div>
        </div>
        <div className={styles.tags}>
          <span className={styles.label}>
            برچسب ها
          </span>
          {tags?.map((tag: any) => (
            <span
              key={tag}
              onClick={() => handleLabelClick(tag.id)}
              className={`${styles.tag} ${selectedLabels.includes(tag.id) ? styles.selected : ''}`}
            >{tag.name}#</span>
          ))}
        </div>
        <div
          className={styles.dragAndDrop}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <UploadIcon width={24} height={24} fill='var(--modal-upload-icon)' />
          <span className={styles.dragText}>برای بارگذاری مستندات، فایل را <label htmlFor='fileInput' className={styles.upload}>انتخاب</label> کنید یا اینجا بکشید</span>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="fileInput"
          />
        </div>
        <div className={styles.uploadedContent}>
          {uploadedFiles.map(file => (
            <div key={file.id} className={styles.uploadedItem}>
              <div className={styles.uploadedItemDesc}>
                <div className={styles.ItemImage}>
                  <div className={styles.preview}>
                    {renderFilePreview(file)}
                  </div>

                </div>
                <div className={styles.ItemDesc}>
                  <span className={styles.fileName}>{truncateFileName(file.name)}</span>
                  <span className={styles.fileSize}>{file.size}</span>
                </div>
              </div>
              <div className={styles.delete}>
                <DeleteIcon width={16} height={16} fill='var(--modal-delete-icon)' onClick={() => handleDelete(file.id)} />
              </div>
            </div>
          ))}
          {uploadingFiles.map(file => (
            <div key={file.id} className={styles.uploadedItem}>
              <div className={styles.uploadedItemDesc}>
                <div className={styles.uploadingItemImage}>
                  <img src={file.id} alt={file.name} />
                  <div className={styles.cancel}>
                    <CancelIcon width={44} height={44} fill='var(--modal-cancel-icon)' onClick={() => handleCancel(file.id)} />
                  </div>
                </div>
                <div className={styles.ItemDesc}>
                  <span className={styles.fileName}>{truncateFileName(file.name)}</span>
                  <span className={styles.fileSize}>{(file.progress * file.size / 1024 / 1024).toFixed(2)}MB / {(file.size / 1024 / 1024).toFixed(2)}MB</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.modalControllers}>
        <span style={{ cursor: 'pointer' }} onClick={handleCloseModal} className={styles.return}>بازگشت</span>
        <button disabled={isLoading} className={styles.send} onClick={() => { dispatch(createIssueStart()); navigate('/issues'); handleCloseModal() }}>ارسال</button>
      </div>
    </div>
  )
}

export default IssueMobileModal;