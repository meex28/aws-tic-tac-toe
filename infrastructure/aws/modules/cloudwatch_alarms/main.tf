resource "aws_cloudwatch_metric_alarm" "high_http_5xx_errors" {
  alarm_name          = "HighHTTP5xxErrors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "HTTPCode_Target_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = "60"
  statistic           = "Sum"
  threshold           = "5"
  dimensions = {
    LoadBalancer = var.alb_arn_suffix
  }
  alarm_description = "Alarm when the number of HTTP 5xx errors exceeds 5 in a minute"
}

