import "./AdminTable.css";

export const AdminTable = ({handleOpenManager, list, theads}) => {
    return <>
        <table id='admin-table'>
            <thead>
                <tr>
                    { theads.map( head => <th key={head}>{head}</th>)}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    list?.map((listItem)=> <tr key={listItem._id}>
                        { theads.map( head => <td key={head}>{listItem[head]}</td>)}
                        <td >
                            <div className="list-buttons">
                                <button onClick={()=> handleOpenManager('update')}>수정</button>
                                <button onClick={()=> handleOpenManager('delete')}>삭제</button>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
}