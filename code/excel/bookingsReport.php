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
      'style' => PHPExcel_Style_Border::BORDER_THIN
    )
  )
);

// Remove all border (color white)
$objPHPExcel->getActiveSheet()->getStyle('A1:Z100')->applyFromArray($styleNoBorders);

// titles
$titles = array('A1', 'B1', 'C1');

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
$bookings = $post;

$columnDate = 0;
$columnTime = 1;
$columnSections = 2;
$columnItems = 3;
$columnQty = 4;
$currentRow = 2;

foreach ($bookings as $bookingRow => $booking) {

	$sections = $booking->sectionsFiltered;
	$bookingStartRowIndex = $currentRow;

	$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnDate, $currentRow, $booking->date);
	$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnTime, $currentRow, $booking->time);

	if(empty((array) $sections)) {

		$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnQty, $currentRow, '0 orders');
		$currentRow++;
	} else {

		// format sections
		foreach ($sections as $section) {

			$totalModifiers = 0;
			// $cellSName = PHPExcel_Cell::stringFromColumnIndex($column).'10';
			// $cellSQty = PHPExcel_Cell::stringFromColumnIndex($column + 1).'10';

			$objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnSections, $currentRow, $section->sectionName);

			foreach($section->items as $row => $item) {

			// 	$currentRow = $row + 11 + $totalModifiers;
			// 	$cellIName = PHPExcel_Cell::stringFromColumnIndex($column).($currentRow);
			// 	$cellIQty = PHPExcel_Cell::stringFromColumnIndex($column + 1).($currentRow);

		        $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnItems, $currentRow, $item->name);
		        $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnQty, $currentRow, $item->qty);
		 //        formatBorders($cellIName, $objPHPExcel);
		 //        formatBorders($cellIQty, $objPHPExcel);

		        // if(count($item->modifiers) == 0)
				$currentRow++;
		        foreach($item->modifiers as $rowMod => $itemMod) {

		        	$cellMName = PHPExcel_Cell::stringFromColumnIndex($columnItems).($currentRow);
			// 		$cellMQty = PHPExcel_Cell::stringFromColumnIndex($column + 1).($currentRow);

			        $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($columnItems, $currentRow, $itemMod->name);
			        $objPHPExcel->getActiveSheet()->getStyle($cellMName)->getFont()->setSize(9);
			        $objPHPExcel->getActiveSheet()->getStyle($cellMName)->getFont()->setItalic(true);
			        $objPHPExcel->getActiveSheet()->getStyle($cellMName)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
			//         formatBorders($cellMName, $objPHPExcel);
			//         formatBorders($cellMQty, $objPHPExcel);
					// $totalModifiers++;
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
		}
	}

	$cellBookingStart = PHPExcel_Cell::stringFromColumnIndex($columnDate).($bookingStartRowIndex);
	$cellBookingEnd = PHPExcel_Cell::stringFromColumnIndex($columnQty).($currentRow);

	$objPHPExcel->getActiveSheet()->getStyle($cellBookingStart . ':' . $cellBookingEnd)->applyFromArray($styleOutlineBorder);

	$currentRow += 2;
}

$totalsCellTitle = PHPExcel_Cell::stringFromColumnIndex($columnSections).($currentRow);

array_push($titles, $totalsCellTitle);

$objPHPExcel->setActiveSheetIndex(0)->setCellValue($totalsCellTitle, 'TOTALS');

for ($i = 0; $i < count($titles); $i++) {
	setStyles($titles[$i], $objPHPExcel);
}

// merging title cells
// $objPHPExcel->getActiveSheet()->mergeCells($totalsCellTitle . ':E' . $currentRow);
mergeAndCenter($totalsCellTitle, ('E'.$currentRow), $objPHPExcel);

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