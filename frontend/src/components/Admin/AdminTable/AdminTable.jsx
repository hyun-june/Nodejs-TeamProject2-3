import "./AdminTable.css";


const initButtonOption = [
    {
        name : 'update', 
        title : '수정'
    },
    {
        name : 'delete', 
        title : '삭제'
    },
]

export const AdminTable = ({handleOpenManager, list, theads , buttonOption = initButtonOption}) => {
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

                                { 
                                    buttonOption.map(({name, title})=> 
                                        <button key={name} className={name} onClick={()=> handleOpenManager(name)}>{title}</button>) 
                                }
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
}