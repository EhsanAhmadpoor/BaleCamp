import styles from './IssueEditMobileModal.module.scss'
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
import { addFileId, editIssueStart, getIssueEditFiles, getIssueEditInfo, removeFileId, setCategoryForModal, setDescription, setLabelIdsForModal, setStatus, setTitle } from '../../redux/slices/IssueEditModalSlice';
import { fetchTags } from '../../redux/slices/IssueModalSlice';
import { useNavigate } from 'react-router-dom';
import { clearIssueEditModal, closeIssueEditModal } from '../../redux/slices/IssueEditModalSlice';

interface IssueEditModalProps {
  handleCloseModal: () => void
  issueId: string | undefined
}

const IssueEditMobileModal = ({ handleCloseModal, issueId }: IssueEditModalProps) => {

  const dispatch = useDispatch()
  const fetchedTitle = useSelector((state: any) => state.issueEditModal.title);
  const fetchedDesc = useSelector((state: any) => state.issueEditModal.description)
  const fetchedCategory = useSelector((state: any) => state.issueEditModal.category)
  const fetchedLabels = useSelector((state: any) => state.issueEditModal.labelIds)
  const fetchedUploadedFiles = useSelector((state: any) => state.issueEditModal.fileIds)
  const fetchedStatus = useSelector((state: any) => state.issueEditModal.status)
  const published = useSelector((state: any) => state.issueEditModal.published)

  const [title, setTitleState] = useState<string>('')
  const [desc, setDescState] = useState<string>('')
  const [category, setCategoryState] = useState<'Bug' | 'Suggestion' | ''>('')
  const [selectedLabels, setSelectedLabelsState] = useState<{ id: number }[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string; size: string; url: string }[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<{ id: string; name: string; size: number; progress: number }[]>([]);
  const [status, setStatusState] = useState<'Pending' | 'InProgress' | 'Done' | 'Closed' | ''>('')

  const isLoading = useSelector((state: any) => state.issueEditModal.Loading)
  const error = useSelector((state: any) => state.issueEditModal.error)
  const tags = useSelector((state: any) => state.issueModal.tags);

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(getIssueEditInfo(issueId))
    dispatch(getIssueEditFiles(issueId))
  }, [dispatch]);

  useEffect(() => {
    setTitleState(fetchedTitle);
    setDescState(fetchedDesc);
    setCategoryState(fetchedCategory);
    setSelectedLabelsState(fetchedLabels);
    setUploadedFiles(fetchedUploadedFiles);
    setStatusState(fetchedStatus)
  }, [fetchedTitle, fetchedDesc, fetchedCategory, fetchedLabels, fetchedUploadedFiles, fetchedStatus]);

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
  const handleStatusChange = (selectedStatus: 'InProgress' | 'Done' | 'Pending' | 'Closed') => {
    setStatusState(selectedStatus)
    dispatch(setStatus(selectedStatus))
  }

  const handleLabelClick = (label: string) => {
    const labelId = parseInt(label);
    const updatedLabelIds = selectedLabels.some(label => label.id === labelId)
      ? selectedLabels.filter(label => label.id !== labelId)
      : [...selectedLabels, { id: labelId }];

    setSelectedLabelsState(updatedLabelIds);
    dispatch(setLabelIdsForModal(updatedLabelIds));
  };


  const xhrRequests = useRef<{ [key: string]: XMLHttpRequest }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    uploadFiles(newFiles); // Start uploading immediately
    event.target.value = '';
  };

  // Function to handle file drag
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const newFiles = Array.from(event.dataTransfer.files);
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
          dispatch(addFileId({ id: fileId, name: file.name, url: fileUrl }))
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

  const handleReturn = () => {
    dispatch(closeIssueEditModal());
    dispatch(clearIssueEditModal());
    navigate(`/issues/${issueId}`)
  }

  const role = localStorage.getItem('role')


  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <div onClick={handleCloseModal} className={styles.closeIcon}>
          <CloseIcon height={24} width={24} fill='var(--issue-modal-close-icon)' />
        </div>
        <span className={styles.modalTitle}>ویرایش بازخورد</span>
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
        {
          (role === 'Admin' || role === 'Manager') &&
          <div className={styles.category}>
            <div className={styles.categoryTitle}>
              <CategoriesIcon width={24} height={24} fill='var(--issue-modal-category-icon)' />
              <span className={styles.categoryTitleText}>:وضعیت</span>
            </div>
            <div className={styles.statusInput}>
              <div className={styles.suggestDiv}>
                <label htmlFor='Pending'>باز</label>
                <input
                  name='status'
                  id='Pending'
                  type='radio'
                  className={styles.suggest}
                  checked={status === 'Pending'}
                  onChange={() => handleStatusChange('Pending')}
                />
              </div>
              <div className={styles.reportDiv}>
                <label htmlFor='InProgress'>در حال انجام</label>
                <input
                  name='status'
                  id='InProgress'
                  type='radio'
                  className={styles.report}
                  checked={status === 'InProgress'}
                  onChange={() => handleStatusChange('InProgress')}
                />
              </div>
              <div className={styles.reportDiv}>
                <label htmlFor='Done'>انجام شده</label>
                <input
                  name='status'
                  id='Done'
                  type='radio'
                  className={styles.report}
                  checked={status === 'Done'}
                  onChange={() => handleStatusChange('Done')}
                />
              </div>
              <div className={styles.reportDiv}>
                <label htmlFor='Closed'>بسته شده</label>
                <input
                  name='status'
                  id='Closed'
                  type='radio'
                  className={styles.report}
                  checked={status === 'Closed'}
                  onChange={() => handleStatusChange('Closed')}
                />
              </div>
            </div>
          </div>
        }
        <div className={styles.tags}>
          <span className={styles.label}>
            برچسب ها
          </span>
          {tags?.map((tag: any) => (
            <span
              key={tag}
              onClick={() => handleLabelClick(tag.id)}
              className={`${styles.tag} ${selectedLabels?.some(label => label.id === tag.id) ? styles.selected : ''}`}
            >{tag.name}#</span>
          ))}
        </div>
        <div
          className={styles.dragAndDrop}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <UploadIcon width={24} height={24} fill='var(--modal-upload-icon)' />
          <span>برای بارگذاری مستندات، فایل را <label htmlFor='fileInput' className={styles.upload}>انتخاب</label> کنید یا اینجا بکشید</span>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="fileInput"
          />
        </div>
        <div className={styles.uploadedContent}>
          {uploadedFiles?.map(file => (
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
        <span style={{ cursor: 'pointer' }} onClick={handleReturn} className={styles.return}>بازگشت</span>
        {!published && (role === 'Admin' || role === 'Manager') ? (
          <button disabled={isLoading} className={styles.send} onClick={() => { dispatch(editIssueStart({ issueId: issueId, publish: true })); navigate('/issues') }}>انتشار</button>
        ) : (
          <button disabled={isLoading} className={styles.send} onClick={() => { dispatch(editIssueStart({ issueId })); navigate('/issues') }}>ذخیره</button>
        )
        }
      </div>
    </div>
  )
}

export default IssueEditMobileModal;