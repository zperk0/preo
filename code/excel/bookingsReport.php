<?php
/**
 * PHPExcel
 *
 * Copyright (c) 2006 - 2015 PHPExcel
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * @category   PHPExcel
 * @package    PHPExcel
 * @copyright  Copyright (c) 2006 - 2015 PHPExcel (http://www.codeplex.com/PHPExcel)
 * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt	LGPL
 * @version    ##VERSION##, ##DATE##
 */

/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/London');

define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

/** Include PHPExcel */
require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

// Create new PHPExcel object
$objPHPExcel = new PHPExcel();

$styleNoBorders = array(
	  'borders' => array(
            'allborders' => array('style' => PHPExcel_Style_Border::BORDER_THIN,
                   'color' => array('rgb' => PHPExcel_Style_Color::COLOR_WHITE)
                )
            )
	);

$styleOutlineBorder = array(
  'borders' => array(
    'outline' => array(
      'style' => PHPExcel_Style_Border::BORDER_THIN,
	  'color' => array('argb' => '00000000')
    )
  )
);

// Remove all border (color white)
$objPHPExcel->getActiveSheet()->getStyle('A1:Z100')->applyFromArray($styleNoBorders);

// set cells auto height
$objPHPExcel->getActiveSheet()->getRowDimension(1)->setRowHeight(-1);

// titles
$titles = array('A1', 'B1', 'C1', 'D1', 'E1');

// merging title cells
mergeAndCenter('C1', 'E1', $objPHPExcel);

// increase D column width
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(15);

// Titles
$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A1', 'DATE')
            ->setCellValue('B1', 'TIME')
            ->setCellValue('C1', 'ORDERS');

// data from post
$post = json_decode($_POST['data']);

// group bookings by date
$bookingsGroupedByDate = array();
foreach ($post as $bk) {

	if(!isset($bookingsGroupedByDate[$bk->date]))
		$bookingsGroupedByDate[$bk->date] = array();

	array_push($bookingsGroupedByDate[$bk->date], $bk);
}

$columnDate = 0;
$columnTime = 1;
$columnSections = 2;
$columnItems = 3;
$columnQty = 4;
$currentRow = 2;

$totalsArray = array();

foreach ($bookingsGroupedByDate as $bookingDate => $bookings) {

	$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnDate, $currentRow, $bookingDate);
	$bookingStartRowIndex = $currentRow;

	foreach ($bookings as $bookingRow => $booking) {

		$sections = $booking->sectionsFiltered;
		$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnTime, $currentRow, $booking->time);

		if(empty(((array) $sections))) {

			$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnQty, $currentRow, '0 orders');
			$currentRow++;
		} else {

			// format sections
			foreach ($sections as $section) {

				$totalModifiers = 0;
				$sectionStartRowIndex = $currentRow;

				$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnSections, $currentRow, $section->sectionName);

				foreach($section->items as $row => $item) {

					$cellIName = PHPExcel_Cell::stringFromColumnIndex($columnItems).($currentRow);
					$cellIQty = PHPExcel_Cell::stringFromColumnIndex($columnQty).($currentRow);

			        $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnItems, $currentRow, $item->name);
			        $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnQty, $currentRow, $item->qty);
			        formatBorders($cellIName, $objPHPExcel);
			        formatBorders($cellIQty, $objPHPExcel);

			        if(!isset($totalsArray[$item->name])) {

			        	$totalsArray[$item->name] = 0;
			        }

					$totalsArray[$item->name] += $item->qty;

					$currentRow++;
			        foreach($item->modifiers as $rowMod => $itemMod) {

			        	$cellMName = PHPExcel_Cell::stringFromColumnIndex($columnItems).($currentRow);

				        $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnItems, $currentRow, $itemMod->name);
				        $objPHPExcel->getActiveSheet()->getStyle($cellMName)->getFont()->setSize(9);
				        $objPHPExcel->getActiveSheet()->getStyle($cellMName)->getFont()->setItalic(true);
				        $objPHPExcel->getActiveSheet()->getStyle($cellMName)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
				        formatBorders($cellMName, $objPHPExcel);

						$currentRow++;
			        }

			        if($item->notes) {

			        	$cellNotes = PHPExcel_Cell::stringFromColumnIndex($columnItems).($currentRow);

			        	$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnItems, $currentRow, $item->notes);
				        $objPHPExcel->getActiveSheet()->getStyle($cellNotes)->getFont()->setSize(8);
				        $objPHPExcel->getActiveSheet()->getStyle($cellNotes)->getFont()->setItalic(true);
				        $objPHPExcel->getActiveSheet()->getStyle($cellNotes)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
			        	$currentRow++;
			        }
				}

				$cellSectionStart = PHPExcel_Cell::stringFromColumnIndex($columnSections).($sectionStartRowIndex);
				$cellSectionEnd = PHPExcel_Cell::stringFromColumnIndex($columnSections).($currentRow - 1);

				$objPHPExcel->getActiveSheet()->getStyle($cellSectionStart . ':' . $cellSectionEnd)->applyFromArray($styleOutlineBorder);
			}
		}


		$cellBookingTimeStart = PHPExcel_Cell::stringFromColumnIndex($columnTime).($bookingStartRowIndex);
		$cellBookingTimeEnd = PHPExcel_Cell::stringFromColumnIndex($columnTime).($currentRow - 1);

		$objPHPExcel->getActiveSheet()->getStyle($cellBookingTimeStart . ':' . $cellBookingTimeEnd)->applyFromArray($styleOutlineBorder);

		$currentRow++;

		if(isset($bookings[$bookingRow + 1])) {

			$cellBookingDivisorStart = PHPExcel_Cell::stringFromColumnIndex($columnTime).($currentRow - 1);
			$cellBookingDivisorEnd = PHPExcel_Cell::stringFromColumnIndex($columnQty).($currentRow - 1);

			$objPHPExcel->getActiveSheet()->getStyle($cellBookingDivisorStart . ':' . $cellBookingDivisorEnd)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
			$objPHPExcel->getActiveSheet()->getStyle($cellBookingDivisorStart . ':' . $cellBookingDivisorEnd)->getFill()->getStartColor()->setRGB('eeeeee');
			$objPHPExcel->getActiveSheet()->getStyle($cellBookingDivisorStart . ':' . $cellBookingDivisorEnd)->applyFromArray($styleOutlineBorder);
			mergeAndCenter($cellBookingDivisorStart, $cellBookingDivisorEnd, $objPHPExcel);
		}
	}

	$cellBookingStart = PHPExcel_Cell::stringFromColumnIndex($columnDate).($bookingStartRowIndex);
	$cellBookingEnd = PHPExcel_Cell::stringFromColumnIndex($columnQty).($currentRow - 2);
	$cellBookingDate = PHPExcel_Cell::stringFromColumnIndex($columnDate).($currentRow - 2);

	$objPHPExcel->getActiveSheet()->getStyle($cellBookingStart . ':' . $cellBookingEnd)->applyFromArray($styleOutlineBorder);
	$objPHPExcel->getActiveSheet()->getStyle($cellBookingStart . ':' . $cellBookingDate)->applyFromArray($styleOutlineBorder);

	$currentRow++;
}

// TOTALS
$totalsCellTitle1 = PHPExcel_Cell::stringFromColumnIndex($columnSections).($currentRow);
$totalsCellTitle2 = PHPExcel_Cell::stringFromColumnIndex($columnItems).($currentRow);
$totalsCellTitle3 = PHPExcel_Cell::stringFromColumnIndex($columnQty).($currentRow);

// add totals cells to be formatted as a title
array_push($titles, $totalsCellTitle1, $totalsCellTitle2, $totalsCellTitle3);

$objPHPExcel->setActiveSheetIndex(0)->setCellValue($totalsCellTitle1, 'TOTALS');

for ($i = 0; $i < count($titles); $i++) {
	setStyles($titles[$i], $objPHPExcel);
}

// merging totals title cells
mergeAndCenter($totalsCellTitle1, ('E'.$currentRow), $objPHPExcel);

foreach($totalsArray as $keyName => $itemQty) {

	$currentRow++;

	$cellTName = PHPExcel_Cell::stringFromColumnIndex($columnSections).($currentRow);
	$cellTQty = PHPExcel_Cell::stringFromColumnIndex($columnItems).($currentRow);
	$cellTQtyMerge = PHPExcel_Cell::stringFromColumnIndex($columnItems + 1).($currentRow);

	$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnSections, $currentRow, $keyName);
	$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnItems, $currentRow, $itemQty);

	mergeAndCenter($cellTQty, $cellTQtyMerge, $objPHPExcel);

	formatBorders($cellTName, $objPHPExcel);
	formatBorders($cellTQty, $objPHPExcel);
	formatBorders($cellTQtyMerge, $objPHPExcel);
}

// Rename worksheet
$objPHPExcel->getActiveSheet()->setTitle('Report');

function mergeAndCenter($cellStart, $cellEnd, $objExcel) {

	$styleAlignCenter = array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    );

	$objExcel->getActiveSheet()->mergeCells($cellStart.':'.$cellEnd);
	$objExcel->getActiveSheet()->getStyle($cellStart.':'.$cellEnd)->applyFromArray($styleAlignCenter);
}

// title style with background color
function setStyles($cell, $objExcel) {

	$objExcel->getActiveSheet()->getStyle($cell)->getFont()->setBold(true);

	$objExcel->getActiveSheet()->getStyle($cell)->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
    $objExcel->getActiveSheet()->getStyle($cell)->getFill()->getStartColor()->setRGB('d9d9d9');

    formatBorders($cell, $objExcel);
}

function formatBorders($cell, $objExcel) {

	$styleArray = array(
		  'borders' => array(
		      'allborders' => array(
		          'style' => PHPExcel_Style_Border::BORDER_THIN,
	              'color' => array('argb' => '00000000')
		      )
		  )
		);

	$objExcel->getActiveSheet()->getStyle($cell)->applyFromArray($styleArray);
}

// Set active sheet index to the first sheet, so Excel opens this as the first sheet
$objPHPExcel->setActiveSheetIndex(0);


// Redirect output to a client’s web browser (Excel5)
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="Report.xls"');
header('Cache-Control: max-age=0');
// If you're serving to IE 9, then the following may be needed
header('Cache-Control: max-age=1');

// If you're serving to IE over SSL, then the following may be needed
header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header ('Pragma: public'); // HTTP/1.0

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output');
exit;