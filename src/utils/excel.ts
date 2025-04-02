// cspell:disable
import { Salary, User } from '@/services/domain'
import ExcelJS from 'exceljs'
import { formatNumber } from './number'
import { formatDuration, formatTime, ONE_HOUR } from './time'

export function exportToMonthlySalaryExcel(
  salaries: Salary[],
  date: Date,
  users: Map<string, User>,
) {
  const _date = formatTime(date, 'MM-YYYY')
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet(_date)

  const titleRow = worksheet.addRow([`BẢNG LƯƠNG THÁNG ${_date}`])
  worksheet.mergeCells('A1:E1')
  titleRow.font = { bold: true, size: 14, name: 'Arial' }
  titleRow.alignment = { horizontal: 'center', vertical: 'middle' }

  worksheet.addRow([])

  worksheet.columns = [
    { key: 'index', width: 7 },
    { key: 'name', width: 20 },
    { key: 'standardHours', width: 14 },
    { key: 'overtimeHours', width: 14 },
    { key: 'totalSalary', width: 17 },
  ]

  const headerRow = worksheet.addRow([
    'STT',
    'Tên',
    'Giờ chuẩn',
    'Giờ làm thêm',
    'Tổng lương (VND)',
  ])

  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFF' } }
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd9ead3' },
    }
    cell.font = { bold: true, size: 10, name: 'Arial' }
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }
  })

  salaries.forEach((salary, index) => {
    const user = users.get(salary.userId)

    const row = worksheet.addRow([
      index + 1,
      user?.name,
      formatDuration(salary.standardHours * ONE_HOUR),
      formatDuration(salary.overtimeHours * ONE_HOUR),
      formatNumber(salary.totalSalary),
    ])

    row.eachCell((cell, colNumber) => {
      cell.font = { size: 10, name: 'Arial' }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
      switch (colNumber) {
        case 1:
          cell.alignment = { horizontal: 'center', vertical: 'middle' }
          break
        case 2:
          cell.alignment = { horizontal: 'left', vertical: 'middle' }
          break
        case 3:
          cell.alignment = { horizontal: 'right', vertical: 'middle' }
          break
        case 4:
          cell.alignment = { horizontal: 'right', vertical: 'middle' }
          break
        case 5:
          cell.alignment = { horizontal: 'right', vertical: 'middle' }
          break
      }
    })
  })

  saveWorkbook(workbook, `Bang-luong-${_date}.xlsx`)
}

function saveWorkbook(workbook: ExcelJS.Workbook, fileName: string) {
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
  })
}
